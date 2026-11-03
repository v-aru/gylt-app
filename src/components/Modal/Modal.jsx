import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { fadeIn, scaleIn } from "../../../styles/animations";

const CLOSE_MS = 160;

const fadeOut = keyframes`
  to { opacity: 0; }
`;

const scaleOut = keyframes`
  to {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  z-index: 1100;
  animation: ${({ $isClosing }) =>
    $isClosing
      ? css`${fadeOut} ${CLOSE_MS}ms ease forwards`
      : css`${fadeIn} 0.2s ease`};
`;

const ModalContent = styled.div`
  position: relative;
  background: #e1dee9;
  padding: 24px;
  border-radius: 12px;
  max-width: 440px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  animation: ${({ $isClosing }) =>
    $isClosing
      ? css`${scaleOut} ${CLOSE_MS}ms ease forwards`
      : css`${scaleIn} 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.2)`};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

export default function Modal({ title, children, onClose }) {
  const contentRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  // Plays the exit animation before telling the parent to unmount us.
  const requestClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  useEffect(() => {
    contentRef.current?.querySelector("input, select, textarea")?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (event) => event.key === "Escape" && requestClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [requestClose]);

  return (
    <ModalBackground $isClosing={isClosing} onClick={requestClose}>
      <ModalContent
        ref={contentRef}
        $isClosing={isClosing}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton type="button" onClick={requestClose} aria-label="Close">
          &times;
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
}
