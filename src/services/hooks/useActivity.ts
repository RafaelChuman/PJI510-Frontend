import { useQuery } from "react-query";
import { api } from "@/services/api";
import { Activities } from "../entities";

export async function getActivities(): Promise<Activities[]> {
  const { data } = await api.get("activities");

  const formatedData = data.map((zone: Activities) => {
    return {
      id: zone.id,
      name: zone.name,
      createdAt: zone.createdAt,
    };
  });
  return formatedData;
}

export function useActivities() {
  return useQuery("activities", getActivities, {
    staleTime: 1000 * 300, //5min
  });
}
