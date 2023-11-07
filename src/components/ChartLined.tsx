import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

export interface ChartLinedProps {
  labelOfChart: string;
  dataOfChart: dataOfChartLined;
  dataType: "category" | "datetime" | "numeric" | undefined;
  color: { [key: string]: string };
}

export interface dataOfChartLined {
  categories: string[];
  series: {
    name: string;
    group?: string;
    data: {
      x: any;
      y: any;
      fill?: ApexFill;
      fillColor?: string;
      strokeColor?: string;
      meta?: any;
      goals?: any;
      barHeightOffset?: number;
      columnWidthOffset?: number;
    }[];
  }[];
}

const ChartLined: React.FC<ChartLinedProps> = ({
  labelOfChart,
  dataOfChart,
  dataType,
  color,
}: ChartLinedProps) => {

  const options: ApexOptions = {
    chart: {
      id: "realtime",
      height: 350,
      type:"line",
      animations: {
        enabled: false,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: color[300],
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: dataType,
      axisBorder: {
        color: color[600],
      },
      axisTicks: {
        color: color[600],
      },
      categories: dataOfChart.categories,
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };

  const series = dataOfChart.series;

  if( dataOfChart.series.length == 0)
    return <></>

  return (
    <>
      
      <label color={color[600]}>{labelOfChart}</label>

      <ReactApexChart
        type="area"
        height={350}
        width={450}
        options={options}
        series={series}
      />
    </>
  );
};

export default ChartLined;
