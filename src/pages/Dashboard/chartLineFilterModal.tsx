import { ComboBoxMultiple } from "@/components/ComboBoxMultiple";
import { DateInput } from "@/components/DateInput";
import { ModalContainer } from "./dashboard.styled";
import React from "react";
import { IoT } from "@/services/entities";
import { useIoT } from "@/services/hooks/useIoT";

export interface GraphicIoT {
  dateBegin: Date;
  dateEnd: Date;
  ioT: IoT[];
}

export interface DashboardModalProps {
  graphicTemperature: GraphicIoT;
  toggle: () => void;
  setGraphicTemperature: React.Dispatch<
    React.SetStateAction<GraphicIoT>
  >;
}

export function ChartLineFilterModal({
  graphicTemperature,
  toggle,
  setGraphicTemperature,
}: DashboardModalProps) {
  // Function to update only the dateBegin property
  const updateDateBegin = (newDateBegin: Date) => {
    setGraphicTemperature((prevGraphiclTemperature) => ({
      ...prevGraphiclTemperature,
      dateBegin: newDateBegin,
    }));
  };

  // Function to update only the dateEnd property
  const updateDateEnd = (newDateEnd: Date) => {
    setGraphicTemperature((prevGraphiclTemperature) => ({
      ...prevGraphiclTemperature,
      dateEnd: newDateEnd,
    }));
  };

  // Function to update only the ioT property
  const updateIoT = (newIoT: IoT[]) => {
    setGraphicTemperature((prevIoT) => ({
      ...prevIoT,
      ioT: newIoT,
    }));
  };

  const ioTWithoutFormat = useIoT();

  async function handleApplyFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toggle();
  }

  if (!graphicTemperature.ioT.length)
    if (ioTWithoutFormat.data && ioTWithoutFormat.data.length > 0)
      graphicTemperature.ioT.push(ioTWithoutFormat.data[0]);

  return (
    <>
      {ioTWithoutFormat.data ? (
        <ModalContainer>
          <form
            onSubmit={(e) => handleApplyFilter(e)}
            title={"Form Filtro Gráfico"}
            placeholder={"Form Filtro Gráfico"}
          >
            <div className="divFields">
              <label>Data Início</label>

              <DateInput
                date={graphicTemperature.dateBegin}
                setDate={updateDateBegin}
              ></DateInput>
            </div>
            <div className="divFields">
              <label>Data Término</label>
              <DateInput
                date={graphicTemperature.dateEnd}
                setDate={updateDateEnd}
              ></DateInput>
            </div>

            <div className="divFields">
              <label>Selecione o IoT: </label>

              <ComboBoxMultiple
                comboBoxData={ioTWithoutFormat.data}
                comboBoxDefaultValues={graphicTemperature.ioT}
                comboBoxSetValues={updateIoT}
              ></ComboBoxMultiple>
            </div>
            <div className="divFields">
              {/* <button type={"submit"} disabled={formState.isSubmitting} onClick={toggle}> Aplicar</button> */}
              <button type={"submit"}> Aplicar</button>
            </div>
          </form>
        </ModalContainer>
      ) : (
        <></>
      )}
    </>
  );
}
