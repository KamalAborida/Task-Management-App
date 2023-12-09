import { motion } from "framer-motion";
import { useContext } from "react";
import AuthContext from "../../context/auth-context";

function ProjectList(props) {
  const ctx = useContext(AuthContext)

  return (
    <motion.ul
      animate={{ opacity: [0, 1], y: 0, x: [-100, 100, 0] }}
      exit={{
        y: [10, 0],
        x: [0, -200],
        opacity: [1, 0],
      }}
      transition={{ type: "keyframes", duration: 0.5 }}
      className="sideBar__projectsList"
      key="ul"
    >
      {ctx.projectsList &&
        ctx.projectsList.map((project) => {
          return (
            <motion.li
              key={project.name}
              onClick={props.projectHandler}
              className={`${
                project.name === ctx.activeProject ? "activeProject" : ""
              }`}
            >
              {project.name}
            </motion.li>
          );
        })}
      <motion.button
        onClick={props.addProjectHandler}
        className="btn btn-border-white"
        key="btn"
      >
        Add project +
      </motion.button>
    </motion.ul>
  );
}

export default ProjectList;
