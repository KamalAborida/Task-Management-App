import ReactDOM from "react-dom";
import { motion } from "framer-motion";

function BackDrop(props) {
  return ReactDOM.createPortal(
    <motion.div
      animate={{ opacity: [0, 1] }}
      exit={{ opacity: [1, 0.8, 0] }}
      className={`backdrop`}
      onClick={props.closeModalHandler}
    ></motion.div>,
    document.getElementById("backdrop")
  );
}

export default BackDrop;
