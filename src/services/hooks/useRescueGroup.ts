import { useQuery } from "react-query";
import { dataOfChartLined } from "@/components/ChartLined";
import { RescueGroup, getEntitie } from "../entities";

export interface LubrificationSystemsGroupedByData {
  count: number;
  date: Date;
}

export async function getRecueGroup(id: string): Promise<RescueGroup[]> {
  const data = await getEntitie<RescueGroup>({
    name: "rescueGroup",
    whereData: { id: id },
  });

  return data;
}

export function useRescueGroup(id: string, dateBegin?: Date, dateEnd?: Date) {
  return useQuery("RescueGroup", () => getRecueGroup(id), {
    staleTime: 1000 * 300, //30 Seconds
  });
}

// export function FormatLubrificationSystemsToChartLine(
//   lubSisSev: LubrificationSystems[],
//   zonaFilter?: Zones[]
// ) {
//   let data: dataOfChartLined = {
//     categories: [[]],
//     series: [],
//   };

//   let LubSisFiltered: LubrificationSystems[] = [];

//   //Execute a  filter of Zones[] into a LubrificationSystems[]
//   if (zonaFilter?.length && zonaFilter?.length > 0)
//     lubSisSev.map((item) => {
//       const itemFounded = zonaFilter.find(
//         (filterItem) => filterItem.name == item.er.zone.name
//       );
//       if (itemFounded) LubSisFiltered.push(item);
//     });

//   //Order by Date
//   const lubSisSevSorted = LubSisFiltered.sort(
//     (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//   );

//   let initialValue: LubrificationSystems = {
//     activity: { id: "", name: "", createdAt: new Date() },
//     add: 0,
//     collaborator: {
//       cellphone: "",
//       cep: "",
//       createdAt: new Date(),
//       id: "",
//       name: "",
//       numberAddress: "",
//       whatsApp: "",
//     },
//     createdAt: new Date(),
//     er: {
//       createdAt: new Date(),
//       id: "",
//       number: 0,
//       zone: { createdAt: new Date(), id: "", name: "" },
//     },
//     id: "",
//     obs: "",
//   };

//   lubSisSevSorted.reduce((previous, current) => {
//     if (
//       new Date(previous.createdAt).getDate() !=
//       new Date(current.createdAt).getDate()
//     ) {
//       data.categories.push([current.createdAt.toString()]);
//     }

//     let serieIndex = data.series.findIndex(
//       (item) => item.name == current.er.id
//     );
//     if (serieIndex == -1) {
//       const insertData = [
//         {
//           name: current.er.id,
//           group: current.er.zone.name,
//           data: [],
//         },
//       ];
//       data.series.push(...insertData);
//       serieIndex = data.series.length - 1;
//     }

//     data.series[serieIndex].data.push({ x: current.createdAt, y: current.add });

//     return current;
//   }, initialValue);

//   return data;
// }

// export function FormatLubrificationSystemsToChartPie(
//   lubSisSev: LubrificationSystems[],
//   zonaFilter?: Zones[]
// ) {
//   let categories: [string[]] = [[]];
//   let series: { data: number[] } = { data: [] };

//   let LubSisFiltered: LubrificationSystems[] = [];

//   //Execute a  filter of Zones[] into a LubrificationSystems[]
//   if (zonaFilter?.length && zonaFilter?.length > 0)
//     lubSisSev.map((item) => {
//       const itemFounded = zonaFilter.find(
//         (filterItem) => filterItem.name == item.er.zone.name
//       );
//       if (itemFounded) LubSisFiltered.push(item);
//     });

//   //Order by Colaborator
//   const lubSisSevSorted = LubSisFiltered.sort((a, b) => {
//     if (a.collaborator.id < b.collaborator.id) {
//       return -1;
//     }
//     if (a.collaborator.id > b.collaborator.id) {
//       return 1;
//     }
//     return 0;
//   });

//   let initialValue: LubrificationSystems = {
//     activity: { id: "", name: "", createdAt: new Date() },
//     add: 0,
//     collaborator: {
//       cellphone: "",
//       cep: "",
//       createdAt: new Date(),
//       id: "",
//       name: "",
//       numberAddress: "",
//       whatsApp: "",
//     },
//     createdAt: new Date(),
//     er: {
//       createdAt: new Date(),
//       id: "",
//       number: 0,
//       zone: { createdAt: new Date(), id: "", name: "" },
//     },
//     id: "",
//     obs: "",
//   };

//   let sum = 0;

//   //Group the Categories By ID of colaborator
//   //Group the Series By Sum(Manutentions)
//   series.data.pop();
//   lubSisSevSorted.reduce((previous, current) => {
//     if (previous.collaborator.id != current.collaborator.id) {
//       categories[0].push(current.collaborator.name.toString());
//       series.data.push(sum);

//       sum = 0;
//     }

//     sum = sum + 1;

//     return current;
//   }, initialValue);

//   return { categories: categories, series: [series] };
// }
