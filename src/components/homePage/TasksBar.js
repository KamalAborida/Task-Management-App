import { useContext, useState } from "react";
import AuthContext from "../../context/auth-context";
import { motion } from "framer-motion";

function Tab(props) {
  return (
    <li>
      <p
        id={props.id}
        onClick={props.activeFunc}
        className={`${props.className} ${
          props.isSelected ? "active-list-tab" : ""
        }`}
      >
        {" "}
        {props.children}
      </p>
      {props.isSelected && (
        <motion.div layoutId="tabs-undeline" className="active-tab-indicator" />
      )}
    </li>
  );
}

function TasksBar() {
  const ctx = useContext(AuthContext);
  const [active, setActive] = useState("");

  const activeTaskListHandler = (e) => {
    if (ctx.activeProject) {
      ctx.activeList = e.target.id;
      setActive(e.target.id);
      ctx.updateTasksContainer();
    }
  };

  return (
    <div className="tasksBar">
      <ul className="tasksBar__list">
        <Tab
          isSelected={
            (active === "active") ||
            (active === "" && ctx.activeProject)
              ? true
              : false
          }
          activeFunc={activeTaskListHandler}
          id="active"
        >
          Active
        </Tab>
        <Tab
          isSelected={active === "completed" ? true : false}
          activeFunc={activeTaskListHandler}
          id="completed"
        >
          Completed
        </Tab>
        <Tab
          isSelected={active === "failed" ? true : false}
          activeFunc={activeTaskListHandler}
          id="failed"
        >
          Failed
        </Tab>
      </ul>
    </div>
  );
}

export default TasksBar;
