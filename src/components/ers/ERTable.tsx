import { SetStateAction } from "react";

import { ERTableLine } from "./ERTableLine";
import { ERs } from "@/services/entities";

interface ERTableProps {
  erData: ERs[] | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  SetERValues: (value: SetStateAction<ERs | undefined>) => void;
}

export function ERTable({ erData, checkBoxValues, setCheckBoxValues, SetERValues}: ERTableProps) {
  
  return (
    
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Número ER</th>
          <th>Zona</th>
          <th>Data de Cadastro</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {erData ? (
          
          erData.map((ctg) => {
            return <ERTableLine key={ctg.id} er={ctg} checkBoxValues={checkBoxValues} setCheckBoxValues={setCheckBoxValues} SetERValues={SetERValues}/>;
          }       )
        ) : (
          <ERTableLine er={undefined} checkBoxValues={checkBoxValues} setCheckBoxValues={setCheckBoxValues} SetERValues={SetERValues}/>
        )}
      </tbody>
    </table>
  );
}
