import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  width: 100%;
  margin-top: 6px;
  margin-left: auto;

  .Fields {
    max-width: 450px;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 6px;
    padding: 5px;
  }

  .ZoneTableContent{
    padding-top:48px;
  }
  .zonaContent{
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 6px;
    margin-left: auto;
  }
`;
