import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [pendingTasks, setPendingTasks] = useState(0);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
      setPendingTasks(savedTasks.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setPendingTasks(tasks.length);
  }, [tasks]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
      Swal.fire({
        title: "Task Added!",
        text: "Your task has been added to the list.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please enter a task",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((element, i) => i !== index);
    setTasks(updatedTasks);
    Swal.fire({
      title: "Task Deleted!",
      text: "Your task has been deleted from the list.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async function editTask(index) {
    const taskToEdit = tasks[index];
    const { value: editedTask } = await Swal.fire({
      title: "Edit Task",
      input: "text",
      inputLabel: "Edit your task",
      inputValue: taskToEdit,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (editedTask) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? editedTask : task
      );
      setTasks(updatedTasks);
      Swal.fire({
        title: "Task Updated!",
        text: "Your task has been updated.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <div className="to-do-list">
      <h1>To Do List</h1>
      <h2>Pending Tasks: {pendingTasks}</h2>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => editTask(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
