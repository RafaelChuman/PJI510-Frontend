import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

export interface ChartBarProps {
  labelOfChart: string;
  dataOfChart: dataOfChartBar;
  color: { [key: string]: string };
}

export interface dataOfChartBar {
  categories: [string[]];
  series: {
    data: number[];
  }[];
}

const ChartPie: React.FC<ChartBarProps> = ({
  labelOfChart,
  dataOfChart,
  color,
}: ChartBarProps) => {

  const lengthOfCategories = dataOfChart.categories[0]?.length;
  const lengthOfSeries = dataOfChart.series[0]?.data?.length;

  if (!lengthOfCategories || !lengthOfSeries) return <></>;

  const series = dataOfChart.series[0].data;
  const categories = dataOfChart.categories[0];

  const options: ApexOptions = {
    series: series,
    chart: {
    width: 380,
    type: 'pie',
  },
  labels: categories,
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };
  return (
    <>
      <label color={color[600]}>{labelOfChart} </label>

      <ReactApexChart
        type="pie"
        height={350}
        width={450}
        options={options}
        series={series}
      />
    </>
  );
};

export default ChartPie;


