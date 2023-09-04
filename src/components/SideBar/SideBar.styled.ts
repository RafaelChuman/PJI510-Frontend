import { theme } from "@/App.styled";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-right: ${theme.space["1.25rem"]};
  background-color: ${theme.colors.cyan[900]};
  border-radius: 10px;
  align-items: center;
  justify-content: baseline;
  height: ${theme.width["250px"]};
  width: ${theme.width["300px"]};

  p,
  a {
    padding: ${theme.space["0.125rem"]};

    color: ${theme.colors.gray[100]};
    font-size: ${theme.fontSizes["1rem"]};
    font-weight: ${theme.fontWeights.bold};
  }

  p {
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: ${theme.space["1.25rem"]};
  }

  a {
    padding-left: ${theme.space["0.75rem"]};
    padding-top: ${theme.space["0.625rem"]};
  }

  .NavLink {
    width: 100%;
  }

  .NavSectionText {
    color: ${theme.colors.gray[200]};
    font-size: ${theme.fontSizes["1.5rem"]};
    font-weight: ${theme.fontWeights.bold};
  }
`;
