import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import AuthContext from "../../context/auth-context";

function AddTaskModal(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (props.openModal) {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Lock scrolling
      document.body.style.overflow = "hidden";

      // Cleanup function to restore scrolling when the component unmounts or when modal is closed
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [props.openModal]);

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const dateHandler = (e) => {
    setDate(e.target.value);
  };

  const timeHandler = (e) => {
    setTime(e.target.value);
  };

  return ReactDOM.createPortal(
    <motion.div
      animate={{ y: [-250, -150], opacity: [0, 1] }}
      exit={{ y: [-150, -250], opacity: [0] }}
      className="taskModal-form"
    >
      <Form method={props.method}>
        <h1 className="taskModal-form__title">Add Task</h1>
        {/* Hidden input for formName */}
        <input type="hidden" name="formName" value={"taskForm"} />
        <input type="hidden" name="id" value={name.trim() + time} />
        <input type="hidden" name="project" value={ctx.activeProject} />
        {/* Hidden input for formName */}
        <input
          onChange={nameHandler}
          value={name}
          name="name"
          type="text"
          placeholder="Task Name"
        />
        <textarea
          onChange={descriptionHandler}
          value={description}
          name="description"
          placeholder="Task Description"
        />
        <div className="taskModal-form__dateTime-div">
          <input
            onChange={dateHandler}
            value={date}
            name="date"
            type="date"
            placeholder="date"
          />
          <input
            onChange={timeHandler}
            value={time}
            name="time"
            type="time"
            placeholder="time"
          />
        </div>
        <div className="taskModal-form__actions-div">
          <button onClick={props.closeModalHandler} className="btn btn-red">
            Cancel
          </button>
          <button className="btn btn-green" type="submit">
            Add task
          </button>
        </div>
      </Form>
    </motion.div>,
    document.getElementById("modal")
  );
}

export default AddTaskModal;
