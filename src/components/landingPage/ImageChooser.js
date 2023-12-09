import img1 from "../../Assets/imgChooser1.jpg";
import img2 from "../../Assets/imgChooser2.jpg";
import img3 from "../../Assets/imgChooser3.jpg";
import img4 from "../../Assets/imgChooser4.jpg";
// import img5 from "../../Assets/imgChooser5.jpg"
import { motion } from "framer-motion";

function ImageChooser(props) {
  return (
    <div className={`image-chooser ${props.className}`}>
      {props.className === "" && <p>Choose an image please</p>}
      {props.className !== "" && (
        <motion.p
          animate={{ y: [-20, 0, 15, 0] }}
          transition={{ type: "keyframes", duration: 0.2 }}
        >
          Please choose a valid img from below
        </motion.p>
      )}
      <div onClick={props.imgHandler} className="images-div">
        <motion.img
          whileHover={{ scale: 0.8 }}
          id="img1"
          className="img"
          src={img1}
          alt=""
        />
        <motion.img
          whileHover={{ scale: 0.8 }}
          id="img2"
          className="img"
          src={img2}
          alt=""
        />
        <motion.img
          whileHover={{ scale: 0.8 }}
          id="img3"
          className="img"
          src={img3}
          alt=""
        />
        <motion.img
          whileHover={{ scale: 0.8 }}
          id="img4"
          className="img"
          src={img4}
          alt=""
        />
      </div>
    </div>
  );
}

export default ImageChooser;
