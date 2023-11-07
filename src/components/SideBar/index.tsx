import { Container } from "./SideBar.styled";
import { NavLinkComponent } from "./NavLink";
import { NavSection } from "./NavSection";
import {
  RiHome2Line,
  RiDashboardLine,
  RiGitMergeLine,
  RiHealthBookLine,
  RiInputMethodLine,
} from "react-icons/ri";

export function SideBar() {
  return (
    <Container>
      <NavSection title="IoT">
      <NavLinkComponent href="/Dashboard" icon={RiHome2Line} navComponent="Home" />
        <NavLinkComponent
          href="/User"
          icon={RiHealthBookLine}
          navComponent="Usuários"
        />
        <NavLinkComponent
          href="/Group"
          icon={RiDashboardLine}
          navComponent="Grupos"
        />
        <NavLinkComponent href="/IoT" icon={RiGitMergeLine} navComponent="IoT's" />
{/* 
        <NavLinkComponent
          href="/"
          icon={RiInputMethodLine}
          navComponent=""
        />
        <NavLinkComponent
          href="/"
          icon={RiGitMergeLine}
          navComponent=""
        /> */}
      </NavSection>
    </Container>
  );
}
