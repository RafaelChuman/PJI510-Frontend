import React, { ReactNode } from "react";
import { RiCloseFill } from "react-icons/ri";
import { CloseButton, ModalBox, ModalOverlay } from "./modal.styled";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <ModalOverlay>
          <ModalBox>
            <div className="closeButtonDiv">
              <CloseButton onClick={props.toggle}>
                {React.createElement(RiCloseFill)}
              </CloseButton>
            </div>
            <div className="header"></div>
            <div>{props.children}</div>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}
