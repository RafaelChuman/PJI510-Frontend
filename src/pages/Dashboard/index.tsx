import { ContainerStyled } from "./dashboard.styled";
import { theme } from "@/App.styled";
import { useEffect, useState } from "react";
import React from "react";
import useModal from "@/services/hooks/useModal";
import Modal from "@/components/Modal";
import { RiFilter2Fill } from "react-icons/ri";
import { ChartLineFilterModal, GraphicIoT } from "./chartLineFilterModal";
import ChartBar, { dataOfChartBar } from "@/components/ChartBar";
import ChartLined, { dataOfChartLined } from "@/components/ChartLined";
import ChartPie, { dataOfChartPie } from "@/components/ChartPie";
import {
  FilterDataToCharts,
  FormatDataToChartPie,
  FormatDataToCharts,
  useIoTMonitor,
} from "@/services/hooks/useIoTMonitor";
import { IoT } from "@/services/entities";
import { useIoT } from "@/services/hooks/useIoT";

let gofInitialValue = {
  dateBegin: new Date(),
  dateEnd: new Date(),
  ioT: [] as IoT[],
};

let chartLineData: dataOfChartLined = {
  categories: [],
  series: [],
};

let chartBarData: dataOfChartBar = {
  categories: [],
  series: [],
};

let chartPieData: dataOfChartPie = {
  categories: [],
  series: [],
};

export default function Dashboard() {
  const [color, useColor] = useState(theme.colors.purple);
  const ioT = useIoT();

  gofInitialValue.dateBegin.setHours(gofInitialValue.dateEnd.getHours() - 2);

  if (ioT.data) {
    if (ioT.data.length > 1) {
      gofInitialValue.ioT = [ioT.data[0]];
    }
  }

  const chartLineFilterModal = useModal();
  const chartBarFilterModal = useModal();
  const chartPieFilterModal = useModal();

  const [chartLineFilter, setChartLineFilter] =
    useState<GraphicIoT>(gofInitialValue);

  const ioTMonitor = useIoTMonitor(
    chartLineFilter.dateBegin,
    chartLineFilter.dateEnd
  );

  let ioTSorted
  if (ioTMonitor.data) {
    ioTSorted = FilterDataToCharts(
    ioTMonitor.data,
    chartLineFilter.ioT
  );
  }

  if (ioTSorted) {
    chartLineData = FormatDataToCharts(
      ioTSorted,
      "temperature",
      
    );
    chartBarData = FormatDataToCharts(
      ioTSorted,
      "noBreak"
    );

    chartPieData = FormatDataToChartPie(
      ioTSorted,
      "humidity"
    );

  }

  return (
    <>
      <Modal
        isOpen={chartLineFilterModal.isOpen}
        toggle={chartLineFilterModal.toggle}
      >
        <ChartLineFilterModal
          graphicTemperature={chartLineFilter}
          setGraphicTemperature={setChartLineFilter}
          toggle={chartLineFilterModal.toggle}
        ></ChartLineFilterModal>
      </Modal>

      <Modal
        isOpen={chartBarFilterModal.isOpen}
        toggle={chartBarFilterModal.toggle}
      >
        <ChartLineFilterModal
          graphicTemperature={chartLineFilter}
          setGraphicTemperature={setChartLineFilter}
          toggle={chartBarFilterModal.toggle}
        ></ChartLineFilterModal>
      </Modal>
      {/*
      <Modal
        isOpen={chartPieFilterModal.isOpen}
        toggle={chartPieFilterModal.toggle}
      >
        <ChartLineFilterModal
          graphiclOilUsed={chartPieFilter}
          setGraphicOilUsed={setChartPieFilter}
          toggle={chartPieFilterModal.toggle}
        ></ChartLineFilterModal>
      </Modal> */}

      <ContainerStyled colorStyled={color}>
        <div className="ChartDataContainer">
          <div className="filterButton">
            <button onClick={chartLineFilterModal.toggle}>
              {React.createElement(RiFilter2Fill)}{" "}
            </button>
          </div>
          <div className="contentChart">
            {chartLineData.categories.length && (
              <ChartLined
                dataOfChart={chartLineData}
                labelOfChart="Temperatura em ºC"
                dataType="datetime"
                color={color}
              ></ChartLined>
            )}
          </div>
        </div>
        {/* </ContainerStyled>

      <ContainerStyled colorStyled={color}> */}

        <div className="ChartDataContainer">
          <div className="filterButton">
            <button onClick={chartBarFilterModal.toggle}>
              {React.createElement(RiFilter2Fill)}{" "}
            </button>
          </div>
          <div className="contentChart">
            {chartBarData && (
              <ChartBar
                dataOfChart={chartBarData}
                labelOfChart="Funcionamento Nobreak"
                dataType={"datetime"}
                color={color}
              ></ChartBar>
            )}
          </div>
        </div>
      </ContainerStyled>

      <ContainerStyled colorStyled={color}>
        <div className="ChartDataContainer">
          <div className="filterButton">
            <button onClick={chartPieFilterModal.toggle}>
              {React.createElement(RiFilter2Fill)}{" "}
            </button>
          </div>
          <div className="contentChart">
            {chartPieData.series.length && (
              <ChartPie
                dataOfChart={chartPieData}
                labelOfChart="Umidade"
                color={color}
              ></ChartPie>
            )}
          </div>
        </div>
      </ContainerStyled>
    </>
  );
}
