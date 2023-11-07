import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 6px;
  margin-left: auto;

  .RescueGroupTableContent {
    padding-top: 48px;
  }

  .Fields {
    max-width: 450px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 6px;
    padding: 5px;
  }

  .imagePreview {
    width: 32;
    height: 32px;

    filter: grayscale(100%);

    vertical-align: middle;

    border-radius: 4px;
  }
`;
