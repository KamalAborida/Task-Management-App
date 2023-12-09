import { json } from "react-router-dom";
import { makeADefaultProject } from "./homePageActions";

export const getUserData = async () => {
  const response = await fetch(
    "https://test-project-e1028-default-rtdb.firebaseio.com/user.json"
  );

  if (!response.ok) {
    console.log(response);
    throw json({ message: "Could not fetch userData." });
  }

  const data = await response.json();
  return data;
};

export const getProjects = async () => {
  const response = await fetch(
    "https://test-project-e1028-default-rtdb.firebaseio.com/projects.json"
  );

  const data = await response.json();

  if (data === null) {
    makeADefaultProject()
    getProjects()
  }

  if (!response.ok) {
    console.log(response);
    throw json({ message: "Could not fetch projects." });
  }

  return Object.values(data);
};
