import { SetStateAction } from "react";
import { RiPencilLine } from "react-icons/ri";
import { Checkbox } from "../CheckBox";
import { Zones } from "@/services/entities";
import { convertToDateBR } from "@/services/utils";

interface TableLineProps {
  zone: Zones | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  SetZone: (value: SetStateAction<Zones | undefined>) => void;
}

export function ZoneTableLine({
  zone,
  checkBoxValues,
  setCheckBoxValues,
  SetZone,
}: TableLineProps) {
  if (!zone) {
    return <></>;
  }

  return (
    <tr>
      <td>
        <Checkbox
          type={"checkbox"}
          title={"Deletar"}
          placeholder={"Deletar"}
          dataOfCheckbox={zone}
          name="ZoneTable"
          checkBoxValues={checkBoxValues}
          setCheckBoxValues={setCheckBoxValues}
        ></Checkbox>
      </td>
      <td>{zone.name}</td>
      <td>{convertToDateBR(zone.createdAt)}</td>
      <td>
        <button onClick={() => SetZone(zone)}>
          <RiPencilLine></RiPencilLine>
          &nbsp; Editar
        </button>
      </td>
    </tr>
  );
}
