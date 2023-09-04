import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  width: 100%;
  margin-top: 6px;
  margin-left: auto;

  div {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 6px;
    margin-left: auto;
  }

  .activityTableContent{
    padding-top:48px;
  }
  .activityContent{
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 6px;
    margin-left: auto;
  }
`;
