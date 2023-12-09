import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError()
  console.log(error);
  // const ctx = useContext(AuthContext)

  return (
    <div className="ErrorPage">
      <p>{error.message}</p>
    </div>
  );
}

export default ErrorPage;
