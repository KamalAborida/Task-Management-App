import logo from "../../Assets/Logo.svg";
// import { motion } from "framer-motion";

function SplashScreen() {
  return (
    <div
      className="splash-screen"
    >
      <img src={logo} alt="logo" />
      <h1>Scheduling made easy</h1>
      <h2>Task Managment App</h2>
    </div>
  );
}

export default SplashScreen;
