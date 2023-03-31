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
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="title" className="block text-sm font-bold mb-2">
        Task:
      </label>
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="description" className="block text-sm font-bold mb-2">
        Description:
      </label>
      <textarea
        name="description"
        value={task.description}
        placeholder="Description"
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <button className="bg-indigo-600 px-2 py-1 rounded-sm text-sm">
        Save
      </button>
    </form>
  );
};

export default TaskForm;
