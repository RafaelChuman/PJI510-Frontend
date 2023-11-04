import { User } from "@/services/entities";
import { SetStateAction } from "react";
import { UserTableLine } from "./UserTableLine";

interface UserTableProps {
  userData: User[] | undefined;
  checkBoxValues: String[] | undefined;
  setCheckBoxValues: (value: SetStateAction<String[] | undefined>) => void;
  setUser: (value: SetStateAction<User | undefined>) => void;
}

export function UserTable({
  userData,
  checkBoxValues,
  setCheckBoxValues,
  setUser,
}: UserTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Nome</th>
          <th>Telegram</th>
          <th>Data Criação</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userData !== undefined ? (
          userData.map((user) => {
            return (
              <UserTableLine
                key={user.id}
                user={user}
                checkBoxValues={checkBoxValues}
                setCheckBoxValues={setCheckBoxValues}
                setUser={setUser}
              />
            );
          })
        ) : (
          <UserTableLine
            key="0"
            user={undefined}
            checkBoxValues={checkBoxValues}
            setCheckBoxValues={setCheckBoxValues}
            setUser={setUser}
          />
        )}
      </tbody>
    </table>
  );
}
