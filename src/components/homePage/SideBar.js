import { useContext, useState } from "react";
import BackDrop from "../general/BackDrop";
import AddProjectModal from "./AddProjectModal";
import { useNavigation } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { AnimatePresence, motion } from "framer-motion";
import ProjectList from "./ProjectsList";
import HideButton from "./HideButton";
import LogoImg from "./LogoImg";

function SideBar(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(true);
  const ctx = useContext(AuthContext);
  const [activeProject, setactiveProject] = useState(ctx.activeProject);
  // const [mobileMode, setMobileMode] = useState(false);
  // const [landingPageOpened, setLandingPageOpened] = useState(true)
  const [windowSize, setWindowSize] = useState(window.screen.width);
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

  // const checkWidth = () => {
  //   if (landingPageOpened) {
  //     if (window.screen.width < 900) {
  //       setMobileMode(true);
  //     } else {
  //       setMobileMode(false);
  //     }
  //   }
  //   setLandingPageOpened(false)
  // };

  const projectHandler = (e) => {
    setactiveProject(e.target.closest("li").textContent);
    ctx.activeProject = e.target.closest("li").textContent;
    ctx.updateApp();
  };

  // console.log(mobileMode);

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

      {windowSize > 900 && (
        <motion.div
          animate={{
            width: !openSideBar ? 50 : 250,
          }}
          layout
          className={`sideBar ${!openSideBar ? "hide-sideBar" : ""}`}
          key="sideBarDiv"
        >
          <AnimatePresence>
            {openSideBar && (
              <div className="sideBar__logoProjects-div" key="logoDiv">
                <LogoImg />
                <ProjectList
                  projectHandler={projectHandler}
                  addProjectHandler={addProjectHandler}
                />
              </div>
            )}
          </AnimatePresence>

          <HideButton
            hideSideBarHandler={hideSideBarHandler}
            openSideBar={openSideBar}
          />
        </motion.div>
      )}

      {windowSize < 900 && (
        <div className={`sideBar`} key="sideBarDiv">
          <div className="sideBar__logoProjects-div" key="logoDiv">
            <LogoImg />
            <ProjectList
              projectHandler={projectHandler}
              addProjectHandler={addProjectHandler}
            />
          </div>

          <HideButton
            hideSideBarHandler={hideSideBarHandler}
            openSideBar={openSideBar}
          />
        </div>
      )}
    </>
  );
}

export default SideBar;
