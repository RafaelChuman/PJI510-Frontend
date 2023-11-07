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
      dateEnd: dateEnd.toString(),
    },
  });

  return data;
}

export function useIoTMonitor(dateBegin: Date, dateEnd: Date) {
  return useQuery("IoTMonitor", () => getIoTMonitor(dateBegin, dateEnd), {
    staleTime: 1000 * 300, //5 min
  });
}

export function FilterDataToCharts(
  ioTMonitor: IoTMonitor[],
  ioTFilter?: IoT[]
) {
  let ioTFiltered: IoTMonitor[] = [];

  //Execute a  filter of IoT[] into a IoTMonitor[]
  if (ioTFilter?.length && ioTFilter?.length > 0)
    ioTMonitor.map((item) => {
      ioTFilter.find((filterItem) => {
        if (filterItem.id == item.IoT.id) {
          ioTFiltered.push(item);
        }
      });
    });

  //Order by Data
  return ioTFiltered.sort((a, b) => {
    if (a.IoT.id < b.IoT.id) {
      return -1;
    }
    if (a.IoT.id > b.IoT.id) {
      return 1;
    }
    return 0;
  });
}

export function FormatDataToCharts(
  ioTSorted: IoTMonitor[],
  field: "temperature" | "noBreak" | "humidity"
) {
  //Group the Categories By ID of IoT
  //Group the Series By IoT, and Define the IoT Information Group by Group

  let categories: string[] = [];
  let series: { name: string; data: { x: Date; y: number }[] }[] = [];

  categories.pop();
  let count = 0;
  let x = 0;

  if (ioTSorted.length >= 1) {
    const initialValue = ioTSorted[0];
    categories.push(initialValue.IoT.name);
    series.push({ name: initialValue.IoT.name, data: [] });

    ioTSorted.reduce((previous, current) => {
      if (previous.IoT.id != current.IoT.id) {
        //categories.push([current.IoT.id.toString(), current.IoT.Group.name]);
        categories.push(current.IoT.name);
        series.push({ name: current.IoT.name, data: [] });

        count++;
      }

      if (field == "noBreak")
        series[count].data.push({
          x: current.createdAt,
          y: Number(current.noBreak),
        });

      if (field == "humidity")
        series[count].data.push({ x: current.createdAt, y: current.humidity });

      if (field == "temperature")
        series[count].data.push({
          x: current.createdAt,
          y: current.temperature,
        });

      x = x + 1;
      return current;
    }, initialValue);
  }
  return { categories: categories, series: series };
}

export function FormatDataToChartPie(
  ioTSorted: IoTMonitor[],
  field: "temperature" | "noBreak" | "humidity"
) {

  

  let categories: string[] = [];
  let series: number[] = [];

  let previous = ioTSorted[0];
  const last = ioTSorted.length - 1;

  for (let index = 0; index < ioTSorted.length; index++) {
    let current = ioTSorted[index];

    if (previous.IoT.id != current.IoT.id) {
      categories.push(previous.IoT.name);
      if (field == "noBreak") series.push(Number(previous.noBreak));
      if (field == "humidity") series.push(Number(previous.humidity));
      if (field == "temperature") series.push(Number(previous.temperature));

      previous = current;
    }
  }

  categories.push(ioTSorted[last].IoT.name);
  if (field == "noBreak") series.push(Number(ioTSorted[last].noBreak));
  if (field == "humidity") series.push(Number(ioTSorted[last].humidity));
  if (field == "temperature") series.push(Number(ioTSorted[last].temperature));

  return { categories: categories, series: series };
}
