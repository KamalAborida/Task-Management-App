import { useContext } from "react";
import AuthContext from "../../context/auth-context";

function UserData() {
  const ctx = useContext(AuthContext);
  return (
    <div className="userData">
      <img src={ctx.userData.img} alt="PP" />
      <p className="userData__name">{ctx.userData.name}</p>
    </div>
  );
}

export default UserData;
