import { motion } from "framer-motion";

function TaskWrapper(props) {
  return (
    <motion.div
      animate={{ y: [-20, 0], opacity: [0, 1] }}
      exit={{ y: [0, -20], opacity: [1, 0] }}
      transition={{duration: 0.5, delay: 0.1}}
      className={`task ${props.classes}`}
    >
      {props.children}
    </motion.div>
  );
}

export default TaskWrapper;
