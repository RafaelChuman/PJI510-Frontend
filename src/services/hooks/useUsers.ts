import { useQuery } from "react-query";
import { api } from "../api";
import { User } from "../entities";



export async function getUsers(): Promise<User[]> {
  const { data } = await api.get("users");

  return data;
}

export function useUsers() {
  return useQuery("Users", getUsers, {
    staleTime: 1000 * 300, //5 min
  });
}

