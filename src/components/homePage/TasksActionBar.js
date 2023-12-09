import { useContext, useState } from "react";
import AuthContext from "../../context/auth-context";
import { useSubmit } from "react-router-dom";

function TasksActionBar() {
  const ctx = useContext(AuthContext);
  const submit = useSubmit();

  const deleteProjectHandler = () => {
    submit(
      { activeProject: ctx.activeProject, formName: "projectForm" },
      { method: "DELETE" }
    );
    ctx.activeProject = ""
    ctx.updateApp()
  };

  return (
    <div className="tasksActionBar">
      {ctx.activeProject !== "" && (
        <>
          <p className="tasksActionBar__activeProject">{ctx.activeProject}</p>
          <p
            className="tasksActionBar__deleteAction"
            onClick={deleteProjectHandler}
          >
            Delete
          </p>
        </>
      )}
    </div>
  );
}

export default TasksActionBar;
