import { useContext, useState } from "react";
import TaskWrapper from "../general/TaskWrapper";
import AuthContext from "../../context/auth-context";
import { useNavigation, useSubmit } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function Task(props) {
  const ctx = useContext(AuthContext);
  const navigation = useNavigation();
  const [toggleTaskInfo, setToggleTaskInfo] = useState(
    ctx.activeList === "active" ? false : true
  );
  const submit = useSubmit();

  const deleteTaskHandler = () => {
    submit(
      { id: props.id, activeProject: ctx.activeProject, formName: "taskForm" },
      { method: "DELETE" }
    );
  };

  const completeTaskHandler = () => {
    submit(
      {
        name: props.name,
        description: props.description,
        date: props.date,
        time: props.time,
        id: props.id,
        project: ctx.activeProject,
        formName: "taskForm",
        taskList: "completed",
      },
      { method: "POST" }
    );
  };

  // const editTaskHandler = () => {
  //   submit(
  //     { id: props.id, activeProject: ctx.activeProject, formName: "taskForm" },
  //     { method: "PATCH" }
  //   );
  // };

  const toggleTaskInfoHandler = () => {
    setToggleTaskInfo((prev) => !prev);
  };

  return (
    <AnimatePresence>
      <TaskWrapper>
        <div className="task__header">
          <p>{props.name}</p>
          <motion.i
            animate={{ rotateX: toggleTaskInfo ? 180 : 0 }}
            className="fa-solid fa-caret-up"
            onClick={toggleTaskInfoHandler}
          ></motion.i>
        </div>

        <AnimatePresence>
          {toggleTaskInfo && (
            <>
              <motion.p
                animate={{ opacity: [0, 1], y: [10, 0] }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.2 }}
                className="task__description"
              >
                {props.description}
              </motion.p>
              <motion.p
                animate={{ opacity: [0, 1], y: [10, 0] }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.2 }}
                className="task__date"
              >
                {props.time} / {props.date}
              </motion.p>
            </>
          )}
        </AnimatePresence>

        <motion.div layout className="task__actions-div">
          {ctx.activeList === "active" && (
            <button
              disabled={navigation.state === "loading"}
              onClick={completeTaskHandler}
              className="btn btn-green"
            >
              Complete
            </button>
          )}

          <motion.div layout>
            {ctx.activeList === "active" && (
              <button
                className="btn btn-red"
                onClick={deleteTaskHandler}
                disabled={navigation.state === "loading"}
              >
                {navigation.state === "idle" && (
                  <i className={`fa-solid fa-trash`}></i>
                )}
                {navigation.state === "loading" && (
                  <i className="fa-solid fa-clock"></i>
                )}
              </button>
            )}
          </motion.div>
        </motion.div>
      </TaskWrapper>
    </AnimatePresence>
  );
}

export default Task;
