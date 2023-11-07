import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

export interface ChartPieProps {
  labelOfChart: string;
  dataOfChart: dataOfChartPie;
  color: { [key: string]: string };
}

export interface dataOfChartPie {
  categories: string[];
  series: number[];
}

const ChartPie: React.FC<ChartPieProps> = ({
  labelOfChart,
  dataOfChart,
  color,
}: ChartPieProps) => {
  const lengthOfCategories = dataOfChart.categories[0]?.length;
  const lengthOfSeries = dataOfChart.series.length;

  if (!lengthOfCategories || !lengthOfSeries) return <></>;

  const series = dataOfChart.series;
  const categories = dataOfChart.categories;

  const options: ApexOptions = {
    series: series,
    chart: {
      width: 380,
      type: "radialBar",
    },
    labels: categories,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <>
      <label color={color[600]}>{labelOfChart} </label>

      <ReactApexChart
        type="radialBar"
        height={350}
        width={450}
        options={options}
        series={series}
      />
    </>
  );
};

export default ChartPie;
