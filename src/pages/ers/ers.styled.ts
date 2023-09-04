import { theme } from "@/App.styled";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  width: 100%;
  margin-top: 6px;
  margin-left: auto;



  .ERTableContent{
    padding-top:20px;
  }
  .ERContent{
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 6px;
    margin-left: auto;
  }

  .EREditLabelContent{
    display:flex;
    text-align:center;
    justify-content:center;
    align-items: center;
    border-radius: 0.25rem;
    border: 2px solid ${theme.colors.cyan[700]};
    font-size: ${theme.fontSizes["1.125rem"]};
    height: ${theme.fontSizes["2.25rem"]};
    width:100%;
  }
`;
