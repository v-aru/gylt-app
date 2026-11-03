import { createContext, useCallback, useContext, useRef, useState } from "react";
import styled from "styled-components";
import { slideInRight } from "../../styles/animations";

const DISMISS_MS = 4000;
// Longer when there's an action like Undo, so there's time to reach it.
const ACTION_DISMISS_MS = 8000;

const ToastContext = createContext(() => {});

const Viewport = styled.div`
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(420px, calc(100vw - 32px));
  z-index: 1200;
  pointer-events: none;
`;

const Toast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: ${({ $tone }) => ($tone === "error" ? "#b03a2e" : "#2b1745")};
  color: white;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  animation: ${slideInRight} 0.25s ease;
  pointer-events: auto;

  button {
    background: none;
    border: none;
    color: #d8c4ff;
    font-weight: 700;
    cursor: pointer;
    padding: 2px 6px;
    border-radius: 4px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const timers = useRef({});

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const scheduleDismiss = useCallback(
    (id, ms) => {
      clearTimeout(timers.current[id]);
      timers.current[id] = setTimeout(() => dismiss(id), ms);
    },
    [dismiss]
  );

  // showToast("Saved") or showToast("Deleted", { action: { label: "Undo", onClick } })
  const showToast = useCallback(
    (message, { action, tone } = {}) => {
      const id = (nextId.current += 1);
      const duration = action ? ACTION_DISMISS_MS : DISMISS_MS;
      setToasts((prev) => [...prev.slice(-2), { id, message, action, tone, duration }]);
      scheduleDismiss(id, duration);
    },
    [scheduleDismiss]
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Viewport role="status" aria-live="polite">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            $tone={toast.tone}
            // Hovering pauses the auto-dismiss.
            onMouseEnter={() => clearTimeout(timers.current[toast.id])}
            onMouseLeave={() => scheduleDismiss(toast.id, toast.duration)}
          >
            <span>{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  dismiss(toast.id);
                  toast.action.onClick();
                }}
              >
                {toast.action.label}
              </button>
            )}
          </Toast>
        ))}
      </Viewport>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
