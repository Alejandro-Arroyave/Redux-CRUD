import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, editTask } from "../features/tasks/taskSlice";

const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask(task));
    }
    navigate("/");
  };

  return (
    <form>
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={task.description}
        placeholder="Description"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Save</button>
    </form>
  );
};

export default TaskForm;
