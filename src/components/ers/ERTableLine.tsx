import { SetStateAction } from "react";
import { RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../CheckBox";
import { convertToDateBR } from "@/services/utils";
import { ERs } from "@/services/entities";

interface TableLineProps {
  er: ERs | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  SetERValues: (value: SetStateAction<ERs | undefined>) => void;
}

export function ERTableLine({
  er,
  checkBoxValues,
  setCheckBoxValues,
  SetERValues,
}: TableLineProps) {
  const navigate = useNavigate();

  if (!er) {
    return <></>;
  }

  return (
    <tr>
      <td>
        <Checkbox
          dataOfCheckbox={er}
          checkBoxValues={checkBoxValues}
          setCheckBoxValues={setCheckBoxValues}
          title="Deletar"
          placeholder={"Deletar"}
          name="ERTable"
        ></Checkbox>
      </td>
      <td>{er.number.toString()}</td>
      <td>{er.zone.name}</td>
      <td>{convertToDateBR(er.createdAt)}</td>
      <td>
        
          <button type="button" onClick={()=>SetERValues(er)}>
            <RiPencilLine />
            &nbsp; Editar
          </button>
      </td>
    </tr>
  );
}
