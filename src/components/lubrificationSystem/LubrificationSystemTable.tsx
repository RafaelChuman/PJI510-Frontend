import { SetStateAction } from "react";

import { LubrificationSystemTableLine } from "./LubrificationSystemTableLine";
import { LubrificationSystems } from "@/services/entities";

interface UserTableProps {
  lubrificationSystemData: LubrificationSystems[] | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
}

export function LubrificationSystemTable({ lubrificationSystemData, checkBoxValues,  setCheckBoxValues}: UserTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Atividade</th>
          <th>Qnt Lub Add</th>
          <th>Obs</th>
          <th>Colaborador</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {lubrificationSystemData ? (
          lubrificationSystemData.map((ctg) => {
            return <LubrificationSystemTableLine key={ctg.id} lubrificationSystem={ctg} checkBoxValues={checkBoxValues} setCheckBoxValues={setCheckBoxValues}/>;
          })
        ) : (
          <LubrificationSystemTableLine lubrificationSystem={undefined} checkBoxValues={checkBoxValues} setCheckBoxValues={setCheckBoxValues}/>
        )}
      </tbody>
    </table>
  );
}
