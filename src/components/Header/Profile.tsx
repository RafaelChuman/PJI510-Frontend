import { SignOut } from "@/services/hooks/useAuthentication";

interface ProfileProps {
  userName: string;
  name: string;
}


export function Profile({ userName, name }: ProfileProps) {
  function HandleSignOut() {
    SignOut();
  }

  return (
    <div className={"ProfileContent"}>
      <div>
        <p  className={"UserName"}>{userName}</p>
      
        <p className={"Name"}>{name}</p>
      </div>
      <div>
        <img
          onClick={HandleSignOut}
          alt={userName}
          title="Logout"
          src="http://github.com/rafaelChuman.png"
        ></img>
      </div>
    </div>
  );
}
