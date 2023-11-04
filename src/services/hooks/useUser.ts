import { useQuery } from "react-query";
import { User, getEntitie } from "../entities";

export async function getUser(): Promise<User[]> {
  const data = await getEntitie<User>({ name: "user" });

  return data;
}

export function useUsers() {
  return useQuery("User", getUser, {
    staleTime: 1000 * 300, //5 min
  });
}
