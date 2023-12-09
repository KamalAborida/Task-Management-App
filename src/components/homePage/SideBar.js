import { useContext, useState } from "react";
import logo from "../../Assets/Logo.svg";
import BackDrop from "../general/BackDrop";
import AddProjectModal from "./AddProjectModal";
import { useNavigation } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { AnimatePresence, motion } from "framer-motion";

function SideBar(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);
  const ctx = useContext(AuthContext);
  const [activeProject, setactiveProject] = useState(ctx.activeProject);
  const navigation = useNavigation();

  if (navigation.state !== "idle" && openModal) {
    setOpenModal(false);
  }

  const addProjectHandler = () => {
    setOpenModal(true);
  };

  const closeProjectModal = () => {
    setOpenModal(false);
  };

  const hideSideBarHandler = () => {
    setOpenSideBar((prev) => !prev);
  };

  const projectHandler = (e) => {
    setactiveProject(e.target.closest("li").textContent);
    ctx.activeProject = e.target.closest("li").textContent;
    ctx.updateApp();
  };

  return (
    <>
      <AnimatePresence>
        {openModal && (
          <AddProjectModal
            closeModalHandler={closeProjectModal}
            method="post"
            key="projectModal"
          />
        )}
        {openModal && (
          <BackDrop closeModalHandler={closeProjectModal} key="backdrop" />
        )}
      </AnimatePresence>

      <motion.div
        animate={{ width: !openSideBar ? 50 : 250 }}
        layout
        className={`sideBar ${!openSideBar ? "hide-sideBar" : ""}`}
      >
        <AnimatePresence>
          {openSideBar && (
            <div className="sideBar__logoProjects-div">
              <motion.img
                animate={{ opacity: [0, 1], y: 0, x: [-100, 20, 0] }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "keyframes" }}
                src={logo}
                alt="logo"
                className="logo"
                key="img"
              />
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
                        key={project.id}
                        onClick={projectHandler}
                        className={`${
                          project.name === ctx.activeProject
                            ? "activeProject"
                            : ""
                        }`}
                      >
                        {project.name}
                      </motion.li>
                    );
                  })}
                <motion.button
                  onClick={addProjectHandler}
                  className="btn btn-border-white"
                  key="btn"
                >
                  Add project +
                </motion.button>
              </motion.ul>
            </div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          // animate={{ x: openSideBar ? 0 : -10 }}
          className="btn btn-hide"
          onClick={hideSideBarHandler}
        >
          <AnimatePresence>
            {openSideBar && <p>Hide</p>}{" "}
            <motion.i layout className="fa-solid fa-eye"></motion.i>
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </>
  );
}

export default SideBar;
