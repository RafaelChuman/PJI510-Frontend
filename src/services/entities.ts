import { api } from "./api";

export interface User {
  id: string;
  name: string;
  userName: string;
  password: string;
  imgPath: string;
  email: string;
  celular: number;
  telegram: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  noBreak: number;
  User: User;
  createdAt: Date;
}

export interface getEntityParams {
  name: "user" | "group";
  whereData?: { [key: string]: string };
}

export async function getEntitie<Type>({
  name,
  whereData,
}: getEntityParams): Promise<Type[]> {
  
  const { data } = await api.get<Type[]>(name, {
    params: {
      ...whereData,
    },
  });

  return data;
}
