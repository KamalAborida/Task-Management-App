import { motion, AnimatePresence } from "framer-motion";

function HideButton(props) {
  return (
    <motion.button
      layout
      // animate={{ x: openSideBar ? 0 : -10 }}
      className="btn btn-hide"
      onClick={props.hideSideBarHandler}
    >
      <AnimatePresence>
        {props.openSideBar && <p>Hide</p>}{" "}
        <motion.i layout className="fa-solid fa-eye"></motion.i>
      </AnimatePresence>
    </motion.button>
  );
}

export default HideButton;
