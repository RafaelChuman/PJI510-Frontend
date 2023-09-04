import { theme } from "@/App.styled";
import styled from "styled-components";

interface ChartsProps {
  colorStyled: { [key: string]: string };
}

//export function Container({ color }: ChartsProps) {

export const ContainerStyled  = styled.div<ChartsProps>`
  display: flex;
  width: 100%;
  flex-direction: row;
  aling-itens: center;
  justify-content: center;

  .ChartDataContainer {
    display: flex;
    position: relative;
    width: fit-content;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 10px;
    padding: 00px;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background: ${(props) => props.colorStyled[50]};

    .filterButton {
      position: absolute;
      top: 15px;
      right: 15px;
      display: inline-block;
    }
    .contentChart{
      margin-top: calc(15px + 27px)
    }
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  .divFields {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 20px;
  }

  .comboBoxMulti {
    display: flex;
    width: 100%;
    margin: 0px;
    padding: 0px;
    position: relative;
    box-sizing: border-box;
  }
`;
