import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import { action as userDataAction } from "./components/landingPage/LoginForm";
import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as homeLoader } from "./pages/HomePage";
import { action as addTaskDataAction } from "./pages/HomePage";
import AuthContext from "./context/auth-context";

function App() {
  const routes = createBrowserRouter([
    {
      index: true,
      path: "/Task-Management-App",
      element: <LandingPage />,
      errorElement: <ErrorPage />,
      action: userDataAction,
    },
    {
      path: "/home",
      element: <HomePage />,
      errorElement: <ErrorPage />,
      loader: homeLoader,
      action: addTaskDataAction,
    },
  ]);

  return (
    <AuthContext.Provider
      value={{
        userData: { name: "", img: null },
        projectsList: [],
        activeProject: "",
        activeList: "active",
        updateTasksContainer: () => {},
        updateApp: () => {},
      }}
    >
      <RouterProvider router={routes} />
    </AuthContext.Provider>
  );
}

export default App;
