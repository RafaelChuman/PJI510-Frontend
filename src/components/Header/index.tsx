import { RiMenuLine } from "react-icons/ri";
import { AuthContext } from "@/services/hooks/useAuthentication";
import { Container } from "./Header.styled";
import { Logo } from "./Logo";
import { Profile } from "./Profile";

export function Header() {
  return (
    <Container>
      <Logo />

      <AuthContext.Consumer>
        {(contextData) => (
          <Profile
            name={contextData.nameProvider}
            userName={contextData.userNameProvider}
          ></Profile>
        )}
      </AuthContext.Consumer>
    </Container>
  );
}
