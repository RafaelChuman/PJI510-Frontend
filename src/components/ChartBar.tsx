import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

export interface ChartBarProps {
  labelOfChart: string;
  dataOfChart: dataOfChartBar;
  dataType: "category" | "datetime" | "numeric" | undefined;
  color: { [key: string]: string };
}

export interface dataOfChartBar {
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

const ChartBar: React.FC<ChartBarProps> = ({
  labelOfChart,
  dataOfChart,
  dataType,
  color,
}: ChartBarProps) => {
  const series = dataOfChart.series;

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
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
        columnWidth: "45%",
        distributed: false,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
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
  };

  const lengthOfCategories = dataOfChart.categories[0]?.length;
  const lengthOfSeries = dataOfChart.series[0]?.data?.length;

  if (!lengthOfCategories || !lengthOfSeries) return <></>;

  console.log("dataOfChart")
  console.log(dataOfChart)

  return (
    <>
      <label color={color[600]}>{labelOfChart} </label>

      <ReactApexChart
        type="bar"
        height={350}
        width={450}
        options={options}
        series={series}
      />
    </>
  );
};

export default ChartBar;
