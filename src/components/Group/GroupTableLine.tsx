import { SetStateAction } from "react";
import { RiAddFill, RiPencilLine } from "react-icons/ri";
import { Checkbox } from "../CheckBox";
import { convertToDateBR } from "@/services/utils";
import { Group } from "@/services/entities";

interface TableLineProps {
  group: Group | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setGroup: (value: SetStateAction<Group | undefined>) => void;
  setRescueGroup: (value: SetStateAction<Group | undefined>) => void;
}

export function GroupTableLine({
  group,
  checkBoxValues,
  setCheckBoxValues,
  setGroup,
  setRescueGroup
}: TableLineProps) {
  if (!group) {
    return <></>;
  }

  return (
    <tr>
      <td>
        <Checkbox
          type={"checkbox"}
          title={"Deletar"}
          placeholder={"Deletar"}
          dataOfCheckbox={group}
          name="groupTable"
          checkBoxValues={checkBoxValues}
          setCheckBoxValues={setCheckBoxValues}
        ></Checkbox>
      </td>
      <td>{group.name}</td>
      <td>{group.humidity}</td>
      <td>{group.temperature}</td>
      <td>{group.noBreak}</td>
      <td>
        <button onClick={() => setGroup(group)}>
          <RiPencilLine></RiPencilLine>
          &nbsp; Editar
        </button>
      </td>
      <td>
        <button onClick={() => setRescueGroup(group)}>
          <RiAddFill/>
          &nbsp; Contato
        </button>
      </td>
    </tr>
  );
}
