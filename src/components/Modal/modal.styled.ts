import styled from "styled-components";
import { theme } from "@/App.styled";

export const ModalOverlay = styled.div`
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const ModalBox = styled.div`
  display: block;
  background: white;
  width: 25%;
  height: 50%;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
  margin-left: 5vw;

  .closeButtonDiv {
    position: absolute;
    top: 7%;
    right: 5%;
    display: inline-block;
  }

  .header{
    width: 100%;
    height: calc(7% + 27px);
    padding: 0px;
    margin: 0px;
  }
`;

export const CloseButton = styled.button`
  color: ${theme.colors.pink[700]};
  border: 2px solid ${theme.colors.pink[800]};
`;