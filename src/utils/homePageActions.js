import { json } from "react-router-dom";

export const sendTaskData = async (data) => {
  const activeProject = data.get("project");
  const taskList = data.get("taskList") || "active";

  const taskData = {
    name: data.get("name"),
    description: data.get("description"),
    date: data.get("date"),
    time: data.get("time"),
    id: data.get("id"),
  };

  const response = await fetch(
    `https://test-project-e1028-default-rtdb.firebaseio.com/projects/${activeProject}/${taskList}/${taskData.id}.json`,
    {
      method: "PUT", // or "PATCH" if you want to update an existing task
      body: JSON.stringify(taskData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Couldn't send project data" }, { status: 500 });
  }

  if (taskList === "completed" && response.ok) {
    deleteTask(taskData.id, activeProject);
  }

  return response;
};

export const sendProjectData = async (data) => {
  // const data = await request.formData();
  
  const projectData = {
    name: data.get("name"),
    id: data.get("id"),
    tasks: { active: [], completed: [], failed: [] },
  };

  const response = await fetch(
    `https://test-project-e1028-default-rtdb.firebaseio.com/projects/${projectData.id}.json`,
    {
      method: "PUT", // or "PATCH" if you want to update an existing project
      body: JSON.stringify(projectData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Couldn't send project data" }, { status: 500 });
  }

  return null;
  // console.log(response.json());
};

export const deleteTask = async (id, activeProject) => {
  // const data = await request.formData();

  const response = await fetch(
    `https://test-project-e1028-default-rtdb.firebaseio.com/projects/${activeProject}/active/${id}.json`,
    {
      method: "DELETE", // or "PATCH" if you want to update an existing task
    }
  );

  if (!response.ok) {
    throw json({ message: "Couldn't send project data" }, { status: 500 });
  }

  return null;
  // console.log(response.json());
};

export const deleteProject = async (activeProject) => {
  console.log(activeProject);
  const response = await fetch(
    `https://test-project-e1028-default-rtdb.firebaseio.com/projects/${activeProject}.json`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw json({ message: "Couldn't delete project" }, { status: 500 });
  }

  return response;
};

export const makeADefaultProject = async () => {
  const response = await fetch(
    `https://test-project-e1028-default-rtdb.firebaseio.com/projects/"".json`,
    {
      method: "POST", // or "PATCH" if you want to update an existing project
      body: JSON.stringify(""),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw json({ message: "Couldn't send project data" }, { status: 500 });
  }

  return null;
  // console.log(response.json());
}