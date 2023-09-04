import {  SetStateAction } from "react";
import { Checkbox } from "../CheckBox";
import { LubrificationSystems } from "@/services/entities";
import { convertToDateBR } from "@/services/utils";

interface TableLineProps {
  lubrificationSystem: LubrificationSystems | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
}

export function LubrificationSystemTableLine({
  lubrificationSystem,
  checkBoxValues,
  setCheckBoxValues,
}: TableLineProps) {
  if (!lubrificationSystem) {
    return <></>;
  }

  return (
    <tr>
      <td>
        <Checkbox
          checkBoxValues={checkBoxValues}
          setCheckBoxValues={setCheckBoxValues}
          dataOfCheckbox={lubrificationSystem}
          title={"Deletar"}
          placeholder={"Deletar"}
        ></Checkbox>
      </td>
      <td>{lubrificationSystem.activity?.name}</td>
      <td>{lubrificationSystem.add}</td>
      <td>{lubrificationSystem.obs}</td>
      <td>{lubrificationSystem.collaborator?.name}</td>
      <td>{convertToDateBR(lubrificationSystem.createdAt)}</td>
    </tr>
  );
}
