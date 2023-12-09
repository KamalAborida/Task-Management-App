import { json, useNavigate, useNavigation, useSubmit } from "react-router-dom";
import ImageChooser from "./ImageChooser";
import { motion } from "framer-motion";
import { useState } from "react";

function LoginForm() {
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation()

  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [inptClasses, setInptClasses] = useState("");
  const [imgChooserClasses, setImgChooserClasses] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      setInptClasses("inpt-error")
      return
    }
    if (!img) {
      setImgChooserClasses("image-chooser-error");
      return;
    }
    setImgChooserClasses("");
    submit({ name, img }, { method: "PUT"});
    navigate("home");
  };

  const nameInptHandler = (e) => {
    setIsNameTouched(true);
    if (e.target.value === "" && isNameTouched) {
      setInptClasses("inpt-error");
    } else {
      setInptClasses("");
      setName(e.target.value);
    }
  };

  const imgInptHandler = (e) => {
    const imagesDiv = e.target.closest(".images-div");

    if (imagesDiv) {
      imagesDiv.querySelectorAll(".active-img").forEach((img) => {
        img.classList.remove("active-img");
      });
    }

    if (e.target.closest(".img")) {
      e.target.closest(".img").classList.add("active-img");
    }

    // console.log(e.target.src);
    setImg(e.target.src);
  };

  return (
    <div className="login-part">
      <motion.form
        action="/"
        method="PUT"
        animate={{ y: [400, 0], opacity: [0, 0.4, 0.6, 1] }}
        transition={{ delay: 1, type: "keyframes" }}
        className="login-form"
        onSubmit={loginHandler}
      >
        <div className="inpt-div">
          {inptClasses === "" && (
            <label className="label" htmlFor="name">
              Enter your name please
            </label>
          )}
          {inptClasses !== "" && (
            <motion.label
              animate={{ y: [-20, 0, 15, 0] }}
              transition={{ type: "keyframes", duration: 0.2 }}
              className="label label-error"
              htmlFor="name"
            >
              Please enter a valid name
            </motion.label>
          )}
          <input
            placeholder="Ex. Jamie Vardy"
            onChange={nameInptHandler}
            type="text"
            name="name"
            id="name"
            className={`inpt ${inptClasses}`}
          />
        </div>
        <ImageChooser
          className={imgChooserClasses}
          imgHandler={imgInptHandler}
        />
        <motion.button
          whileHover={{scale: 0.9 }}
          transition={{ type: "spring" }}
          type="submit"
          className="btn btn-green"
          disabled={navigation.state === "loading"}
        >
          {navigation.state === "idle" && "Continue"}
          {navigation.state === "loading" && "loading..."}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default LoginForm;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    name: data.get("name"),
    img: data.get("img"),
  };

  // console.log(userData);

  const response = await fetch(
    "https://test-project-e1028-default-rtdb.firebaseio.com/user.json",
    {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw json({message: "Couldn;t send user data"}, {status: 500})
  }

  return null;
  // console.log(response);
}
