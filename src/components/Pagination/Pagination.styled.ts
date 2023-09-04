import { theme } from "@/App.styled";
import styled from "styled-components";

export const DivPagination = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
  word-spacing: ${theme.letterSpacings.widest};

  div {
    justify-content: center;
    align-items: center;
    text-align: center;

    display: flex;
    direction: row;
    width: 100%;
    word-spacing: ${theme.letterSpacings.widest};
  }

  .PaginationButton {
    font-size: 12px;
    width: 24px;
  }

  .PaginationButtonSelected {
    color: ${theme.colors.pink[600]};
  }
`;
