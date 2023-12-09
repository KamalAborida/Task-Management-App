import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Form } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function AddProjectModal(props) {
  const [projectName, setProjetcName] = useState("");

  const projectNameHandler = (e) => {
    setProjetcName(e.target.value);
  };

  return ReactDOM.createPortal(
    <motion.div
      className="projectModal-form"
      animate={{ y: [-100, 100], opacity: [0, 1] }}
      exit={{ y: [100, -100], opacity: [0] }}
    >
      <Form method={props.method}>
        <h1 className="projectModal-form__title">Add Project</h1>
        {/* Hidden input for formName */}
        <input type="hidden" name="formName" value={"projectForm"} />
        <input type="hidden" name="id" value={`${projectName}`} />
        {/* Hidden input for formName */}
        <input
          onChange={projectNameHandler}
          value={projectName}
          name="name"
          type="text"
          placeholder="Project Name"
        />
        <div className="projectModal-form__actions-div">
          <button onClick={props.closeModalHandler} className="btn btn-red">
            Cancel
          </button>
          <button className="btn btn-green" type="submit">
            Add project
          </button>
        </div>
      </Form>
    </motion.div>,
    document.getElementById("modal")
  );
}

export default AddProjectModal;
