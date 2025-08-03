const taskInput = document.getElementById("taskInput");
const addbtn = document.getElementById("addbtn");
const taskList = document.getElementById("taskList");
let tasks = [];
function renderTaks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerText = task.text + (task.completed ? "✅" : "");
    li.style.cursor = "pointer";
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTaks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.borderRadius = "8px";
    deleteBtn.style.backgroundColor = "black";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTaks();
    });
    taskList.appendChild(li);
    li.appendChild(deleteBtn);
  });
}

addbtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks();
  taskInput.value = "";
  renderTaks();
  console.log(newTask);
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
