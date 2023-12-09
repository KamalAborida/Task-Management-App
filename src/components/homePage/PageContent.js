// import Task from "./Task";
import UpperBar from "./UpperBar";
import TasksActionBar from "./TasksActionBar";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import BackDrop from "../general/BackDrop";
import TaskContainer from "./TaskContainer";
import { useNavigation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function PageContent() {
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();

  if (navigation.state !== "idle" && openModal) {
    setOpenModal(false);
  }

  const addTaskHandler = () => {
    setOpenModal(true);
  };

  const closeTaskModal = () => {
    setOpenModal(false);
  };

  return (
    <motion.div layout className="pageContent">
      <AnimatePresence>
        {openModal && (
          <AddTaskModal closeModalHandler={closeTaskModal} method="post" key="taskModal" openModal={openModal} />
        )}
        {openModal && <BackDrop closeModalHandler={closeTaskModal} key="backDrop" />}
      </AnimatePresence>
      <UpperBar />
      <TasksActionBar />
      <TaskContainer addTaskHandler={addTaskHandler} />
    </motion.div>
  );
}

export default PageContent;
