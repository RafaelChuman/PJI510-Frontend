import { IoT } from "@/services/entities";
import { SetStateAction } from "react";
import { IoTTableLine } from "./IoTTableLine";

interface IoTTableProps {
  ioTData: IoT[] | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  SetIoTValues: (value: SetStateAction<IoT | undefined>) => void;
}

export function IoTTable({
  ioTData,
  checkBoxValues,
  setCheckBoxValues,
  SetIoTValues,
}: IoTTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Nome IoT</th>
          <th>Grupo</th>
          <th>Data de Cadastro</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {ioTData ? (
          ioTData.map((ctg) => {
            return (
              <IoTTableLine
                key={ctg.id}
                ioT={ctg}
                checkBoxValues={checkBoxValues}
                setCheckBoxValues={setCheckBoxValues}
                SetIoTValues={SetIoTValues}
              />
            );
          })
        ) : (
          <IoTTableLine
            ioT={undefined}
            checkBoxValues={checkBoxValues}
            setCheckBoxValues={setCheckBoxValues}
            SetIoTValues={SetIoTValues}
          />
        )}
      </tbody>
    </table>
  );
}
