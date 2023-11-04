import { RiPencilLine } from "react-icons/ri";
import { convertToDateBR, convertToWhatsAppMask } from "@/services/utils";
import { SetStateAction } from "react";
import { Checkbox } from "../CheckBox";
import { User } from "@/services/entities";

interface TableLineProps {
  user: User | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setUser: (value: SetStateAction<User | undefined>) => void;
}

export function UserTableLine({
  user,
  checkBoxValues,
  setCheckBoxValues,
  setUser,
}: TableLineProps) {
  if (!user) {
    return <></>;
  }

  return (
    <tr>
      <td>
        <Checkbox
          type={"checkbox"}
          title={"Deletar"}
          placeholder={"Deletar"}
          name="userTable"
          checkBoxValues={checkBoxValues}
          dataOfCheckbox={user}
          setCheckBoxValues={setCheckBoxValues}
        ></Checkbox>
      </td>
      <td>{user.name}</td>
      <td>{convertToWhatsAppMask(user.telegram)}</td>
      <td>{convertToDateBR(user.createdAt)}</td>
      <td>
        <button
          type="button"
          onClick={() => {
            setUser(user);
          }}
        >
          <RiPencilLine fontSize="16" />
          Editar
        </button>
      </td>
    </tr>
  );
}
