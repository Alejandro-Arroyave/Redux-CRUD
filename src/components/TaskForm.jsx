import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../features/tasks/taskSlice";

const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    navigate("/");
  };

  return (
    <form>
      <input
        name="title"
        type="text"
        placeholder="Title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Save</button>
    </form>
  );
};

export default TaskForm;
