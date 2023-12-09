import logo from "../../Assets/Logo.svg";
import { motion } from "framer-motion";

function SplashScreen() {
  return (
    <motion.div
      animate={{ x: [-400, 0], opacity: [0, 0.5, 1] }}
      className="splash-screen"
    >
      <img src={logo} alt="logo" />
      <h1>Scheduling made easy</h1>
      <h2>Task Managment App</h2>
    </motion.div>
  );
}

export default SplashScreen;
