import { ComboBoxMultiple } from "@/components/ComboBoxMultiple";
import { DateInput } from "@/components/DateInput";
import { ModalContainer } from "./dashboard.styled";
import React from "react";

export interface GraphiclOilUsed {
  dateBegin: Date;
  dateEnd: Date;
  zones: Zones[];
}

export interface DashboardModalProps {
  graphiclOilUsed: GraphiclOilUsed;
  toggle: () => void;
  setGraphicOilUsed: React.Dispatch<React.SetStateAction<GraphiclOilUsed>>;
}

export function ChartLineFilterModal({
  graphiclOilUsed,
  toggle,
  setGraphicOilUsed,
}: DashboardModalProps) {
  // Function to update only the dateBegin property
  const updateDateBegin = (newDateBegin: Date) => {
    setGraphicOilUsed((prevGraphiclOilUsed) => ({
      ...prevGraphiclOilUsed,
      dateBegin: newDateBegin,
    }));
  };

  // Function to update only the dateEnd property
  const updateDateEnd = (newDateEnd: Date) => {
    setGraphicOilUsed((prevGraphiclOilUsed) => ({
      ...prevGraphiclOilUsed,
      dateEnd: newDateEnd,
    }));
  };

  // Function to update only the zones property
  const updateZones = (newZones: Zones[]) => {
    setGraphicOilUsed((prevZones) => ({
      ...prevZones,
      zones: newZones,
    }));
  };

  const zonesWithoutFormat = useZones();

  async function handleApplyFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toggle();
  }


  if(!graphiclOilUsed.zones.length)
    if(zonesWithoutFormat.data && zonesWithoutFormat.data.length > 0)
      graphiclOilUsed.zones.push(zonesWithoutFormat.data[0])

  return (
    <>
      {zonesWithoutFormat.data ? (
        <ModalContainer>
          <form
            onSubmit={(e) => handleApplyFilter(e)}
            title={"Form Filtro Gráfico"}
            placeholder={"Form Filtro Gráfico"}
          >
            <div className="divFields">
              <label>Data Início</label>

              <DateInput
                date={graphiclOilUsed.dateBegin}
                setDate={updateDateBegin}
              ></DateInput>
            </div>
            <div className="divFields">
              <label>Data Término</label>
              <DateInput
                date={graphiclOilUsed.dateEnd}
                setDate={updateDateEnd}
              ></DateInput>
            </div>

            <div className="divFields">
              <label>Selecione a Zona: </label>

              <ComboBoxMultiple
                
                comboBoxData={zonesWithoutFormat.data}
                comboBoxDefaultValues={graphiclOilUsed.zones}
                comboBoxSetValues={updateZones}
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