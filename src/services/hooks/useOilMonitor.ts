import { useQuery } from "react-query";
import { api } from "@/services/api";
import { OilMonitor, Zones } from "../entities";
import { dataOfChartBar } from "@/components/ChartBar";
import { set } from "date-fns";

export interface OilMonitorGroupedByER {
  erId: string;
  oilMonitors: OilMonitor[];
}

export function groupByER(oilMonitor: OilMonitor[]): OilMonitorGroupedByER[] {
  const sortedData = oilMonitor.sort((first, second) =>
    first.createdAt > second.createdAt ? 1 : -1
  );

  let groupedData: OilMonitorGroupedByER[] = [];

  sortedData.forEach((current) => {
    const index = groupedData.findIndex((item) => item.erId == current.er.id);

    if (index === -1) {
      groupedData.push({ erId: current.er.id, oilMonitors: [current] });
    } else {
      groupedData[index].oilMonitors.push(current);
    }
  });

  return groupedData;
}

export async function getOilMonitor(
  dateBegin: Date,
  dateEnd: Date
): Promise<OilMonitor[]> {
  const { data } = await api.get("oilMonitor", {
    params: {
      ERId: ["1", "2"],
      dateBegin: dateBegin,
      dateEnd: dateEnd,
    },
  });

  const formatedData = data.map((oilMonitor: OilMonitor) => {
    return {
      id: oilMonitor.id,
      createdAt: new Date(oilMonitor.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      oilLevel: oilMonitor.oilLevel,
      er: oilMonitor.er,
    };
  });

  return formatedData;
}

export function useOilMonitor(dateBegin: Date, dateEnd: Date) {
  return useQuery("oilMonitor", () => getOilMonitor(dateBegin, dateEnd), {
    staleTime: 1000 * 300, //5 min
  });
}

export function FormatDataToCharts(
  oilmonitor: OilMonitor[],
  zonaFilter?: Zones[],
  criticalOilLevel?: number
) {

  let categories: [string[]] = [[]];
  let series: {data: number[]} = {data:[]}
 

  let oilFiltered: OilMonitor[] = [];

  //Execute a  filter of Zones[] into a LubrificationSystems[]
  if (zonaFilter?.length && zonaFilter?.length > 0)
    oilmonitor.map((item) => {
      const itemFounded = zonaFilter.find((filterItem) => {
        if (filterItem.name == item.er.zone.name) {
          return filterItem.name == item.er.zone.name;
        }
      });

      //if (itemFounded)

      if (criticalOilLevel) {
        if (itemFounded && criticalOilLevel > item.oilLevel) {
          oilFiltered.push(item);
        }
      } else {
        if (itemFounded) oilFiltered.push(item);
      }
    });

  //Order by ID of Moving Staircase
  const oilSorted = oilFiltered.sort((a, b) => {
    if (a.er.id < b.er.id) {
      return -1;
    }
    if (a.er.id > b.er.id) {
      return 1;
    }
    return 0;
  });

  //Group the Categories By ID of Moving Staircase
  //Group the Series By Moving Staircase, and Define the Moving Staircase Information Group by Zone
  categories.pop();

  oilSorted.reduce((previous, current) => {
    if (previous.er.id != current.er.id) {
      categories.push([current.er.id.toString(), current.er.zone.name]);


      series.data.push(current.oilLevel);

    }

    return current;
  }, initialValue);

  

  return {categories: categories, series: [series]};
}

let initialValue: OilMonitor = {
  oilLevel: 0,
  createdAt: new Date(),
  er: {
    createdAt: new Date(),
    id: "",
    number: 0,
    zone: { createdAt: new Date(), id: "", name: "" },
  },
  id: "",
};
