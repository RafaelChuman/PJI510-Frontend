import { RescueGroup } from "@/services/entities";
import { SetStateAction } from "react";
import { RescueGroupTableLine } from "./RescueGroupTableLine";

interface RescueGroupTableProps {
  rescueGroupData: RescueGroup[] | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
}

export function RescueGroupTable({
  rescueGroupData,
  checkBoxValues,
  setCheckBoxValues,
}: RescueGroupTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Name</th>
          <th>Telegram</th>
        </tr>
      </thead>
      <tbody>
        {rescueGroupData ? (
          rescueGroupData.map((ctg) => {
            return (
              <RescueGroupTableLine
                key={ctg.id}
                rescueGroup={ctg}
                checkBoxValues={checkBoxValues}
                setCheckBoxValues={setCheckBoxValues}
              />
            );
          })
        ) : (
          <RescueGroupTableLine
            rescueGroup={undefined}
            checkBoxValues={checkBoxValues}
            setCheckBoxValues={setCheckBoxValues}
          />
        )}
      </tbody>
    </table>
  );
}
