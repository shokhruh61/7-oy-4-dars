import React, { useEffect, useState } from "react";

function ToDoList() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [drag, setDrag] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const newTodo = [...todo, task];
    setTodo(newTodo);
    localStorage.setItem("todo", JSON.stringify(newTodo));
    setTask("");
  }

  function handleDragEnd(e) {
    e.preventDefault();
  }

  function validate() {
    if (task.length == 0) {
      alert("Berilgan qiymat bosh!");
      return false;
    }
    if (task.length > 42) {
      alert(
        "Berilgan task judayam uzun kamroq narsa kiriting yoki bazilarini alohidalarga bo'ling!"
      );
      return false;
    }
    return true;
  }

  useEffect(function () {
    const save = localStorage.getItem("todo");
    if (save) {
      setTodo(JSON.parse(save));
    }
  }, []);

  function handleDelete(index) {
    const confirmDelete = confirm(
      "Rostdan ham shu kiritilgan todo ni o'chirasizmi?"
    );
    if (confirmDelete) {
      const saveDelete = todo.filter((el, i) => i != index);
      setTodo(saveDelete);
      localStorage.setItem("todo", JSON.stringify(saveDelete));
    }
  }

  function handleDragStart(index) {
    setDrag(index);
  }

  function handleDrop(index) {
    if (drag == null) {
      return;
    }
    const dragTask = todo[drag];
    const filtTask = todo.filter((el, i) => i != drag);
    const switchTask = [
      ...filtTask.slice(0, index),
      dragTask,
      ...filtTask.slice(index),
    ];
    setTodo(switchTask);
    localStorage.setItem("todo", JSON.stringify(switchTask));
    setDrag(null);
  }

  return (
    <div className="bg-slate-700 p-5 mx-auto w-[500px] rounded-lg shadow-xl">
      <h1 className="text-white font-semibold text-center mb-8 text-5xl">
        ToDo List
      </h1>
      <form className="flex flex-col items-center gap-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          className="font-serif py-2 px-3 rounded-md w-full pl-3 focus:outline-none"
          placeholder="Enter ToDo..."
        />
        <button
          onClick={handleClick}
          className="duration-500 ease-in-out btn glass w-full text-white hover:text-black font-medium"
        >
          Add Task
        </button>
      </form>
      <div className="mt-5">
        {todo.length > 0 &&
          todo.map((el, index) => {
            return (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragEnd}
                onDrop={() => handleDrop(index)}
                className="flex hover:cursor-grab active:cursor-grabbing items-center justify-between bg-slate-50 shadow-lg mt-4 pl-3 p-2 rounded-md"
              >
                <h4 className="text-lg font-normal text-slate-800">{el}</h4>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white font-normal py-1 px-3 rounded-md"
                >
                  delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ToDoList;
