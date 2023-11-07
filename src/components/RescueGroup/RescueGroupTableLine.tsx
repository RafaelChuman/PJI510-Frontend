import { SetStateAction } from "react";
import { Checkbox } from "../CheckBox";
import { convertToDateBR } from "@/services/utils";
import { RescueGroup } from "@/services/entities";

interface TableLineProps {
  rescueGroup: RescueGroup | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
}

export function RescueGroupTableLine({
  rescueGroup,
  checkBoxValues,
  setCheckBoxValues,
}: TableLineProps) {
  if (!rescueGroup) {
    return <></>;
  }

  return (
    <tr>
      <td>
        <Checkbox
          checkBoxValues={checkBoxValues}
          setCheckBoxValues={setCheckBoxValues}
          dataOfCheckbox={rescueGroup}
          title={"Deletar"}
          placeholder={"Deletar"}
        ></Checkbox>
      </td>
      <td>
        {" "}
        <img
          className="imagePreview"
          alt={rescueGroup.User.userName}
          title="Logout"
          src={rescueGroup.User.imgPath}
        ></img>
      </td>
      <td>{rescueGroup.User.name}</td>
      <td>{rescueGroup.User.telegram}</td>
    </tr>
  );
}
