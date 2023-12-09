import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import AuthContext from "../../context/auth-context";
import { AnimatePresence } from "framer-motion";
import { useNavigation } from "react-router-dom";
import LoadingIndicator from "../general/LoadingIndicator";
import { motion } from "framer-motion";

function TaskContainer(props) {
  const ctx = useContext(AuthContext);
  const navigation = useNavigation();
  const [taskList, setTaskList] = useState([]);
  const [render, setRender] = useState([]);

  ctx.updateTasksContainer = () => {
    setRender([]);
  };

  useEffect(() => {
    setTaskList([]); // Clear the taskList when the active project changes

    if (ctx.activeProject !== "") {
      ctx.projectsList.forEach((project) => {
        if (project.name === ctx.activeProject) {
          for (const key in project[`${ctx.activeList}`]) {
            const task = project[`${ctx.activeList}`][key];
            setTaskList((prev) => [...prev, task]);
          }
        }
      });
    }
  }, [ctx.activeProject, ctx.projectsList, ctx.activeList]);

  let content = taskList.map((task) => {
    return (
      <Task
        name={task.name}
        description={task.description}
        date={task.date}
        key={task.id}
        id={task.id}
        time={task.time}
      />
    );
  });

  return (
    <>
      {navigation.state === "loading" && <LoadingIndicator />}
      <div className="tasksContainer">
        <AnimatePresence>
          {!ctx.activeProject && <p>Please select a project</p>}
          {ctx.activeProject && (
            <>
              <AnimatePresence>{content}</AnimatePresence>
              {ctx.activeList === "active" && (
                <motion.button
                  animate={{ y: [-20, 0], opacity: [0, 1] }}
                  exit={{ y: [0, 20], opacity: [1, 0] }}
                  transition={{ duration: 1, delay: 0.1 }}
                  key={"btn-addTask"}
                  onClick={props.addTaskHandler}
                  className="btn btn-border-green"
                >
                  Add task +
                </motion.button>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default TaskContainer;
