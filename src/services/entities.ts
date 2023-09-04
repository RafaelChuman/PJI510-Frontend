import { api } from "./api";

export interface User {
  id: string;
  name: string;
  userName: string;
  password: string;
  cep: string;
  numberAddress: string;
  cellphone: string;
  whatsApp: string;
  created_at: string;
  isAdmin: boolean;
}

export interface OilMonitor {
  id: string;
  oilLevel: number;
  createdAt: Date;
  er: ERs;
}

export interface LubrificationSystems {
  id: string;
  createdAt: Date;
  add: number;
  obs?: string;
  activity: Activities;
  collaborator: Collaborators;
  er: ERs;
}

export interface ERs {
  id: string;
  number: number;
  createdAt: Date;
  zone: Zones;
}

export interface Zones {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Collaborators {
  id: string;
  name: string;
  cep: string;
  numberAddress: string;
  cellphone: string;
  whatsApp: string;
  createdAt: Date;
}

export interface Activities {
  id: string;
  name: string;
  createdAt: Date;
}


export interface  getEntityParams{
  name: "oilMonitor"| "lubrificationSystems"| "ers"|"zones"| "collaborators" |"activities";
  whereData:{ [key: string]: string }
};

export async function getEntitie<Type>( {name, whereData}: getEntityParams): Promise<Type[]> {
  
  const {where} = whereData;
  const { data } = await api.get<Type[]>(name, {
    params: {
      ...whereData
    },
  });

  return data;
}
