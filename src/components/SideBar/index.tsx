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
        <NavLinkComponent
          href="/user"
          icon={RiHealthBookLine}
          navComponent="Usuários"
        />
        <NavLinkComponent
          href="/Group"
          icon={RiDashboardLine}
          navComponent="Grupos"
        />
        <NavLinkComponent href="/ers" icon={RiHome2Line} navComponent="ER's" />

        <NavLinkComponent
          href="/zones"
          icon={RiInputMethodLine}
          navComponent="Zonas"
        />
        <NavLinkComponent
          href="/activities"
          icon={RiGitMergeLine}
          navComponent="Atividades"
        />
      </NavSection>
    </Container>
  );
}
