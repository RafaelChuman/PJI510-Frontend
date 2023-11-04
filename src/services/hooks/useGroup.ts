import { useQuery } from "react-query";
import { Group, getEntitie } from "../entities";

export async function getGroup(): Promise<Group[]> {
  const data = await getEntitie<Group>({ name: "group" });

  return data;
}

export function useGroup() {
  return useQuery("Group", getGroup, {
    staleTime: 1000 * 300, //5 min
  });
}
