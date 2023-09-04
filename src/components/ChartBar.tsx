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
  categories: [string[]];
  series: {
    data: number[];
  }[];
}

const ChartBar: React.FC<ChartBarProps> = ({
  labelOfChart,
  dataOfChart,
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
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: dataOfChart.categories,
    },
  };

  const lengthOfCategories = dataOfChart.categories[0]?.length;
  const lengthOfSeries = dataOfChart.series[0]?.data?.length;

  if (!lengthOfCategories || !lengthOfSeries) return <></>;

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
