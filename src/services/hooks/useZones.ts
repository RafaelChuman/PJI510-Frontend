import { useQuery } from "react-query";
import { api } from "@/services/api";
import { Zones } from "../entities";

export async function getZones(): Promise<Zones[]> {
  const { data } = await api.get("zones");

  return data;
}

export function useZones() {
  return useQuery("zones", getZones, {
    staleTime: 1000 * 300, //5 min
  });
}
