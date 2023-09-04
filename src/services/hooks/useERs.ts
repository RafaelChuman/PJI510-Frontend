import { useQuery } from "react-query";
import { api } from "@/services/api";
import { ERs } from "../entities";



export async function getERs(): Promise<ERs[]> {
  const { data } = await api.get("ers");

  return data;
}

export function useERs() {
  return useQuery("ers", getERs, {
    staleTime: 1000 * 300, //5 min Seconds
  });
}
