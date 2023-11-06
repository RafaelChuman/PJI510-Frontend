import { useQuery } from "react-query";
import { api } from "@/services/api";
import { dataOfChartBar } from "@/components/ChartBar";
import { set } from "date-fns";
import { IoT, IoTMonitor, getEntitie } from "../entities";
import { convertToDateBR } from "../utils";

// export interface OilMonitorGroupedByER {
//   erId: string;
//   oilMonitors: OilMonitor[];
// }

// export function groupByER(oilMonitor: OilMonitor[]): OilMonitorGroupedByER[] {
//   const sortedData = oilMonitor.sort((first, second) =>
//     first.createdAt > second.createdAt ? 1 : -1
//   );

//   let groupedData: OilMonitorGroupedByER[] = [];

//   sortedData.forEach((current) => {
//     const index = groupedData.findIndex((item) => item.erId == current.er.id);

//     if (index === -1) {
//       groupedData.push({ erId: current.er.id, oilMonitors: [current] });
//     } else {
//       groupedData[index].oilMonitors.push(current);
//     }
//   });

//   return groupedData;
// }

export async function getIoTMonitor(
  dateBegin: Date,
  dateEnd: Date
): Promise<IoTMonitor[]> {
  const data = await getEntitie<IoTMonitor>({
    name: "ioTMonitor",
    whereData: {
      dateBegin: dateBegin.toString(),
      dateEnd: dateBegin.toString(),
    },
  });

  return data;
}

export function useIoTMonitor(dateBegin: Date, dateEnd: Date) {
  return useQuery("IoTMonitor", () => getIoTMonitor(dateBegin, dateEnd), {
    staleTime: 1000 * 300, //5 min
  });
}

export function FormatDataToCharts(
  ioTMonitor: IoTMonitor[],
  ioTFilter?: IoT[],
  critical?: number
) {
  let categories: [string[]] = [[]];
  let series: { name: string; data: {x: number, y:number}[] } = {
    name: "IoTMonitor",
    data: [],
  };

  let ioTFiltered: IoTMonitor[] = [];

  //Execute a  filter of IoT[] into a IoTMonitor[]
  if (ioTFilter?.length && ioTFilter?.length > 0)
    ioTFilter.map((item) => {
      const itemFounded = ioTMonitor.find((filterItem) => {
        if (filterItem.IoT.id == item.id) {
          return filterItem;
        }
      });

      if (critical) {
        if (itemFounded && critical > item.Group.temperature) {
          ioTFiltered.push(itemFounded);
        }
      } else {
        if (itemFounded) ioTFiltered.push(itemFounded);
      }
    });

  //Order by Data
  const ioTSorted = ioTFiltered.sort((a, b) => {
    if (a.IoT.id < b.IoT.id) {
      return -1;
    }
    if (a.IoT.id > b.IoT.id) {
      return 1;
    }
    return 0;
  });

  //Group the Categories By ID of IoT
  //Group the Series By IoT, and Define the IoT Information Group by Group
  categories.pop();
  let cont =1;

  ioTSorted.reduce((previous, current) => {
    if (previous.IoT.id != current.IoT.id) {
      categories.push([current.IoT.id.toString(), current.IoT.Group.name]);

      series.data.push({x: cont,y: current.temperature});
      cont++;
    }

    return current;
  }, initialValue);

  return { categories: categories, series: [series] };
}

let initialValue: IoTMonitor;
