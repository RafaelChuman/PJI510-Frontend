import { SubmitHandler, useForm, ValidationRule } from "react-hook-form";
import {
  AuthContext,
  UserSignInCredentials,
} from "@/services/hooks/useAuthentication";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Container } from "./index.styled";

const Home = () => {
  const [errorLogin, setErrorLogin] = useState("");

  const { SignIn } = useContext(AuthContext);

  const { register, handleSubmit, formState } =
    useForm<UserSignInCredentials>();

  const navigate = useNavigate();

  const userName = register("userName", {
    required: "Nome de Usuário é obrigatório",
    minLength: {
      value: 5,
      message: "O Nome do  Usuário deve ter pelo menos 5 caracteres",
    },
    maxLength: {
      value: 20,
      message: "O Nome do  Usuário deve ter no máximo 20 caracteres",
    },
  });

  const password = register("password", {
    required: "A senha é obrigatório",
    minLength: {
      value: 3,
      message: "A senha deve ter pelo menos 3 caracteres",
    },
    maxLength: {
      value: 25,
      message: "A senha deve ter no máximo 25 caracteres",
    },
  });

  const handleSignIn: SubmitHandler<UserSignInCredentials> = async (values) => {

    const response = await SignIn(values);

    if (response.tokenError != undefined) {
      const mesage = response.tokenError.response?.data.message;
      if (mesage != undefined) {
        setErrorLogin(mesage.toString());
      }
    }
    if (response.token != undefined) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <h1>Login</h1>




      <form onSubmit={handleSubmit(handleSignIn)}>


        <Container>
          <label>Insira seu Usuário: </label>
          <input
            alt="Usuário"
            type="text"
            title="Usuário"
            placeholder="Usuário"
            {...userName}
          />

          <ErrorMessage errors={formState.errors} name="userName" />
        </Container>
        <Container>
          <label>Insira sua Senha: </label>
          <input
            alt="Senha"
            type="password"
            title="Senha"
            placeholder="Senha"
            {...password}
          />
          <ErrorMessage errors={formState.errors} name="password" />
        </Container>
        <Container>
          <button type={"submit"} disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "..." : "Entrar"}
          </button>
        </Container>
      </form>
      {errorLogin}
    </>
  );
};

export default Home;
