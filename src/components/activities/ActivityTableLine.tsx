import { SetStateAction } from "react";
import { RiPencilLine } from "react-icons/ri";
import { Checkbox } from "../CheckBox";
import { Activities } from "@/services/entities";
import { convertToDateBR } from "@/services/utils";

interface TableLineProps {
  activity: Activities | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setActivity: (value: SetStateAction<Activities | undefined>) => void;
}

export function ActivityTableLine({ activity, checkBoxValues, setCheckBoxValues, setActivity }: TableLineProps) {
  if (!activity) {
    return <></>;
  }

  return (
    <tr>
      <td>
        <Checkbox
          type={"checkbox"}
          title={"Deletar"}
          placeholder={"Deletar"}
          name="ActivityTable"
          checkBoxValues={checkBoxValues}
          dataOfCheckbox={activity}
          setCheckBoxValues={setCheckBoxValues}
        ></Checkbox>
      </td>
      <td>{activity.name}
      </td>
      <td>{convertToDateBR(activity.createdAt)}</td>
      <td>
        <button type="button" onClick={()=> setActivity(activity)}>
          <RiPencilLine />
          &nbsp; Editar
        </button>
      </td>
    </tr>
  );
}
