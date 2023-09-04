import { SetStateAction } from "react";

import { ActivityTableLine } from "./ActivityTableLine";
import { Activities } from "@/services/entities";

interface UserTableProps {
  activityData: Activities[] | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setActivity: (value: SetStateAction<Activities | undefined>) => void;
}

export function ActivityTable({ activityData, checkBoxValues, setCheckBoxValues, setActivity }: UserTableProps) {
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
        {activityData ? (
          activityData.map((ctg) => {
            return <ActivityTableLine key={ctg.id} activity={ctg} checkBoxValues={checkBoxValues} setCheckBoxValues={setCheckBoxValues} setActivity={setActivity}/>;
          })
        ) : (
          <ActivityTableLine activity={undefined} checkBoxValues={checkBoxValues} setCheckBoxValues={setCheckBoxValues} setActivity={setActivity}/>
        )}
      </tbody>
    </table>
  );
}
