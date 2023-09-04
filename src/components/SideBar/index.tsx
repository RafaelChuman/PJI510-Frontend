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
      <NavSection title="Manutenção">
        <NavLinkComponent href="/dashboard" icon={RiDashboardLine} navComponent="Dashboard" />
        <NavLinkComponent
          href="/ers"
          icon={RiHome2Line}
          navComponent="ER's"
        />

        <NavLinkComponent href="/zones" icon={RiInputMethodLine} navComponent="Zonas" />
        <NavLinkComponent
          href="/activities"
          icon={RiGitMergeLine}
          navComponent="Atividades"
        />
        <NavLinkComponent
          href="/collaborators"
          icon={RiHealthBookLine}
          navComponent="Colaboradores"
        />
                
      </NavSection>
    </Container>
  );
}
