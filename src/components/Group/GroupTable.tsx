import { SetStateAction } from "react";
import { Group } from "@/services/entities";
import { GroupTableLine } from "./GroupTableLine";

interface GroupTableProps {
  groupData: Group[] | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setGroup: (value: SetStateAction<Group | undefined>) => void;
  setRescueGroup: (value: SetStateAction<Group | undefined>) => void;
}

export function GroupTable({
  groupData,
  checkBoxValues,
  setCheckBoxValues,
  setGroup,
  setRescueGroup,
}: GroupTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Nome</th>
          <th>Temperatura</th>
          <th>Humidade</th>
          <th>Nobreak</th>
          <th> </th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {groupData ? (
          groupData.map((group) => {
            return (
              <GroupTableLine
                key={group.id}
                group={group}
                checkBoxValues={checkBoxValues}
                setCheckBoxValues={setCheckBoxValues}
                setGroup={setGroup}
                setRescueGroup={setRescueGroup}
              />
            );
          })
        ) : (
          <GroupTableLine
            group={undefined}
            checkBoxValues={checkBoxValues}
            setCheckBoxValues={setCheckBoxValues}
            setGroup={setGroup}
            setRescueGroup={setRescueGroup}
          />
        )}
      </tbody>
    </table>
  );
}
