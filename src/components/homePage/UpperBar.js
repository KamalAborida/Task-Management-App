import TasksBar from "./TasksBar";
import UserData from "./UserData";
import { motion } from "framer-motion";

function UpperBar() {
  return (
    <motion.div layout className="upperBar">
      <UserData />
      <TasksBar />
    </motion.div>
  );
}

export default UpperBar;
