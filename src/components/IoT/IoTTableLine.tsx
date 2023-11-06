import { SetStateAction } from "react";
import { RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../CheckBox";
import { convertToDateBR } from "@/services/utils";
import { IoT } from "@/services/entities";

interface TableLineProps {
  ioT: IoT | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  SetIoTValues: (value: SetStateAction<IoT | undefined>) => void;
}

export function IoTTableLine({
  ioT,
  checkBoxValues,
  setCheckBoxValues,
  SetIoTValues,
}: TableLineProps) {
  const navigate = useNavigate();

  if (!ioT) {
    return <></>;
  }

  return (
    <tr>
      <td>
        <Checkbox
          dataOfCheckbox={ioT}
          checkBoxValues={checkBoxValues}
          setCheckBoxValues={setCheckBoxValues}
          title="Deletar"
          placeholder={"Deletar"}
          name="IoTTable"
        ></Checkbox>
      </td>
      <td>{ioT.name.toString()}</td>
      <td>{ioT.Group.name}</td>
      <td>{convertToDateBR(ioT.createdAt)}</td>
      <td>
        <button type="button" onClick={() => SetIoTValues(ioT)}>
          <RiPencilLine />
          &nbsp; Editar
        </button>
      </td>
    </tr>
  );
}
