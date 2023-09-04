import { SetStateAction } from "react";

import { ZoneTableLine } from "./ZoneTableLine";
import { Zones } from "@/services/entities";

interface UserTableProps {
  zoneData: Zones[] | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  SetZone: (value: SetStateAction<Zones | undefined>) => void;
}

export function ZoneTable({
  zoneData,
  checkBoxValues,
  setCheckBoxValues,
  SetZone,
}: UserTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Zona</th>
          <th>Data de Cadastro</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {zoneData ? (
          zoneData.map((ctg) => {
            return (
              <ZoneTableLine
                key={ctg.id}
                zone={ctg}
                checkBoxValues={checkBoxValues}
                setCheckBoxValues={setCheckBoxValues}
                SetZone={SetZone}
              />
            );
          })
        ) : (
          <ZoneTableLine
            zone={undefined}
            checkBoxValues={checkBoxValues}
            setCheckBoxValues={setCheckBoxValues}
            SetZone={SetZone}
          />
        )}
      </tbody>
    </table>
  );
}
