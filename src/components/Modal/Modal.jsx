import { useEffect } from "react";
import styled from "styled-components";

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
`;

const ModalContent = styled.div`
  position: relative;
  background: #e1dee9;
  padding: 24px;
  border-radius: 8px;
  max-width: 440px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export default function Modal({ title, children, onClose }) {
  useEffect(() => {
    const handleKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <CloseButton type="button" onClick={onClose} aria-label="Close">
          &times;
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
}
