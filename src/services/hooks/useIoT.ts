import { useQuery } from "react-query";
import { IoT, getEntitie } from "../entities";

export async function getIoT(): Promise<IoT[]> {
  const data = await getEntitie<IoT>({name: "ioT"})

  return data;
}

export function useIoT() {
  return useQuery("IoT", getIoT, {
    staleTime: 1000 * 300, //5 min Seconds
  });
}
