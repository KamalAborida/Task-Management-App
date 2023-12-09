import { useContext, useState } from "react";
import AuthContext from "../context/auth-context";
import SideBar from "../components/homePage/SideBar";
import PageContent from "../components/homePage/PageContent";
import { redirect, useLoaderData } from "react-router-dom";
import { getProjects, getUserData } from "../utils/homePageLoaders";
import {
  deleteProject,
  deleteTask,
  sendProjectData,
  sendTaskData,
} from "../utils/homePageActions";

function HomePage() {
  const fetchedData = useLoaderData();
  const ctx = useContext(AuthContext);
  const [render, setRender] = useState([])

  ctx.updateApp = () => {
    setRender([])
  }

  ctx.userData = fetchedData.userData;
  ctx.projectsList = fetchedData.projectsData;

  return (
    <div className="homePage">
      <SideBar />
      <PageContent />
    </div>
  );
}

export default HomePage;

export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const userData = await getUserData();
  const projectsData = await getProjects();

  return {
    userData,
    projectsData,
  };
};

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const formName = data.get("formName");

  switch (request.method) {
    case "DELETE":
      if (formName === "taskForm") {
        deleteTask(data.get("id"), data.get("activeProject"));
      } else if (formName === "projectForm") {
        deleteProject(data.get("activeProject"));
      }
      break;

    case "POST":
      if (formName === "taskForm") {
        sendTaskData(data);
      } else if (formName === "projectForm") {
        sendProjectData(data);
      }
      break;

    default:
    // Handle other request.method cases if needed
  }

  return redirect("/Task-Management-App/home");
};
