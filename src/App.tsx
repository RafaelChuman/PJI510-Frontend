import AppRoutes from "@/routes";
import styled from "styled-components";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";

const Container = styled.div`
  width: 1200px;
  height: 800px;
  margin: auto;
`;

function App() {
  return (
    <Container>
      <Header></Header>
      <div className="Main">
        <SideBar />

        <div className="Content">
          <AppRoutes />
        </div>
      </div>
    </Container>
  );
}

export default App;
