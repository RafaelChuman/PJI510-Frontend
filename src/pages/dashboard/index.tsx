import { ContainerStyled } from "./dashboard.styled";
import { theme } from "@/App.styled";
import { useEffect, useState } from "react";
import React from "react";
import useModal from "@/services/hooks/useModal";
import Modal from "@/components/Modal";
import { RiFilter2Fill } from "react-icons/ri";
import {
  ChartLineFilterModal,
  GraphicTemperature,
} from "./chartLineFilterModal";
import ChartBar, { dataOfChartBar } from "@/components/ChartBar";
import ChartLined, { dataOfChartLined } from "@/components/ChartLined";
import ChartPie from "@/components/ChartPie";
import {
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

// let gofInitialValuePie = {
//   dateBegin: new Date(),
//   dateEnd: new Date(),
//   zones: [] as Zones[],
// };

let chartLineData: dataOfChartLined = {
  categories: [[]],
  series: [],
};

// let chartBarData: dataOfChartBar = {
//   categories: [[]],
//   series: [],
// };

// let chartPieData: dataOfChartBar = {
//   categories: [[]],
//   series: [],
// };

export default function Dashboard() {
  const [color, useColor] = useState(theme.colors.purple);
  const ioT = useIoT();

  gofInitialValue.dateBegin.setDate(1);
  // gofInitialValuePie.dateBegin.setDate(1);

  if (ioT.data) {
    if (ioT.data.length > 1) {
      gofInitialValue.ioT = ioT.data;
      //gofInitialValuePie.zones = zones.data;
    }
  }

  const chartLineFilterModal = useModal();
  const chartBarFilterModal = useModal();
  const chartPieFilterModal = useModal();

  const [chartLineFilter, setChartLineFilter] =
    useState<GraphicTemperature>(gofInitialValue);
  // const [chartBarFilter, setChartBarFilter] =
  //   useState<GraphiclOilUsed>(gofInitialValue);
  // const [chartPieFilter, setChartPieFilter] =
  //   useState<GraphiclOilUsed>(gofInitialValuePie);

  const ioTMonitor = useIoTMonitor(
    chartLineFilter.dateBegin,
    chartLineFilter.dateEnd
  );

  //const chartBarDataNotFormated = chartLineDataNotFormated

  // const chartPieDataNotFormated = chartLineDataNotFormated

  if (ioTMonitor.data) {
    chartLineData = FormatDataToCharts(ioTMonitor.data, gofInitialValue.ioT);
  }

  // if (chartBarDataNotFormated.data) {
  //   chartBarData = FormatDataToChartsOilmonitor(
  //     chartBarDataNotFormated.data,
  //     chartBarFilter.zones,
  //     32
  //   );
  // }

  // if (chartPieDataNotFormated.data) {
  //   chartPieData = FormatLubrificationSystemsToChartPie(
  //     chartPieDataNotFormated.data,
  //     chartPieFilter.zones
  //   );
  // }

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

      {/* <Modal
        isOpen={chartBarFilterModal.isOpen}
        toggle={chartBarFilterModal.toggle}
      >
        <ChartLineFilterModal
          graphiclOilUsed={chartBarFilter}
          setGraphicOilUsed={setChartBarFilter}
          toggle={chartBarFilterModal.toggle}
        ></ChartLineFilterModal>
      </Modal>

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
            {chartLineData && (
              <ChartLined
                dataOfChart={chartLineData}
                labelOfChart="Temperatura em ºC"
                dataType="datetime"
                color={color}
              ></ChartLined>
            )}
          </div>
        </div>
      </ContainerStyled>
      {/* <div className="ChartDataContainer">
          <div className="filterButton">
            <button onClick={chartBarFilterModal.toggle}>
              {React.createElement(RiFilter2Fill)}{" "}
            </button>
          </div>
          <div className="contentChart">
            {chartBarData && (
              <ChartBar
                dataOfChart={chartBarData}
                labelOfChart="Nível Crítico de Óleo"
                dataType={undefined}
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
            {chartPieData && (
              <ChartPie
                dataOfChart={chartPieData}
                labelOfChart="Nº Manutenções por Colaborador"
                color={color}
              ></ChartPie>
            )}
          </div>
        </div>
      </ContainerStyled> */}
    </>
  );
}
