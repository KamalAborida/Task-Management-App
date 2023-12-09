import { motion } from "framer-motion";
import logo from "../../Assets/Logo.svg";

function LogoImg() {
  return (
    <motion.img
      animate={{ opacity: [0, 1], y: 0, x: [-100, 20, 0] }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "keyframes" }}
      src={logo}
      alt="logo"
      className="logo"
      key="img"
    />
  );
}

export default LogoImg;
