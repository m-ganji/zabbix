import React, { ReactNode } from "react";
import { Modal } from "react-bootstrap";

interface ModalContainerProps {
  show: boolean;
  title: string;
  setHide: (hide: boolean) => void;
  children: ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  show,
  title,
  setHide,
  children,
}) => {
  return (
    <Modal show={show} onHide={() => setHide(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
