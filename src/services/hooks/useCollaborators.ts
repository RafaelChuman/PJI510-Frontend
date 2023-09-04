import { useQuery } from "react-query";
import { api } from "../api";
import { convertToDateBR, convertToWhatsAppMask } from "../utils";
import { Collaborators } from "../entities";

export async function getCollaborators(): Promise<Collaborators[]> {
  const { data } = await api.get("collaborators");

  return data;
}

export function useCollaborators() {
  return useQuery("collaborators", getCollaborators, {
    staleTime: 1000 * 300, //5 min
  });
}
