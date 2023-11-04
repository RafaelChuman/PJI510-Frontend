import axios, { Axios, AxiosError, AxiosInstance } from "axios";
import { SignOut, TokenError } from "./hooks/useAuthentication";

export function setupAPIClient() {


  const api: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3333/",
    //baseURL: "https://pji510-backend.onrender.com",
    headers: {
      authorization: localStorage.getItem("pji510.token"),
    },
  });

  api.interceptors.request.use((resp) => {

    const token = localStorage.getItem("pji510.token");

    if (resp) {
      if (resp.headers) {

        if (token) {
          resp.headers.authorization = token;
        }
      }
    }
    return resp;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<TokenError>) => {
      if (error.response?.status === 401) {

        SignOut();

      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const api = setupAPIClient();
