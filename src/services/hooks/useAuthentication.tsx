import { AxiosError, AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { User } from "../entities";


export interface TokenError {
  message: string;
}

export interface Token {
  user: UserAuthCredentials;
  token: string;
}

export interface AuthResponse {
  token: AxiosResponse<Token> | void;
  tokenError: AxiosError<TokenError> | void;
}

type AuthContextData = {
  SignIn(credentials: UserAuthCredentials): Promise<AuthResponse>;
  isAuthenticated: boolean;
  userToken: Token | undefined;
  userNameProvider: string;
  nameProvider: string;
};

export interface UserAuthCredentials {
  userName: string;
}

export interface UserSignInCredentials {
  userName: string;
  password: string;
}

let authChanel: BroadcastChannel;

export function SignOut() {
  localStorage.clear();

  authChanel.postMessage("signOut");
}

export async function getToken({
  userName,
  password,
}: UserSignInCredentials): Promise<AuthResponse> {
  let responseToken: AuthResponse = {
    token: undefined,
    tokenError: undefined,
  };

  responseToken.token = undefined;
  responseToken.tokenError = undefined;

  const resp = await api
    .post<Token>("/", {
      userName: userName,
      password: password,
    })
    .catch((error) => {
      responseToken.tokenError = error;
    });

  responseToken.token = resp;

  return responseToken;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState<Token>();
  const isAuthenticated = !!userToken;
  let [userNameProvider, setUserNameProvider] = useState<string>("");
  let [nameProvider, setNameProvider] = useState<string>("");

  useEffect(() => {
    const userName = localStorage.getItem("pji340.userName")
    authChanel = new BroadcastChannel("auth");

    if (userName) {
      let searchParam = userName;
      api
        .get<User>(`users/?userName=${searchParam}`)
        .then((resp) => {
          setUserNameProvider(resp.data.userName);
          setNameProvider(resp.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    authChanel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          setUserNameProvider("");
          setNameProvider("");
          setUserToken({ token: "", user: { userName: "" } });
          navigate("/");
          break;
        case "signIn":
          navigate("/dashboard");
          break;
        default:
          break;
      }
    };
  }, [userToken]);

  async function SignIn({ userName, password }: UserSignInCredentials) {
    const response = await getToken({ userName, password });

    if (response.token) {
      setUserToken({
        token: response.token.data.token,
        user: response.token.data.user,
      });

      localStorage.setItem("pji340.token", response.token.data.token);
      localStorage.setItem("pji340.userName", response.token.data.user.userName);

      authChanel.postMessage("signIn");
    }
    return response;
  }

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        isAuthenticated,
        userToken,
        nameProvider,
        userNameProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}



export function useAuthenticateMutation() {
  return useMutation(getToken);
}

export function useAuthenticate(values: UserSignInCredentials) {
  return useQuery("token", () => getToken(values), {
    staleTime: 1000 * 60 * 60 * 2, //2 horas
  });
}
