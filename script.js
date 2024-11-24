const searchInput = document.getElementById("searchinput");
const addButton = document.getElementById("btn");
const taskUl = document.getElementById("taskList");

const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTaskToUl = (taskText) => {
  const taskLi = document.createElement("li");
  taskLi.classList.add("task");

  const txtDiv = document.createElement("div");
  txtDiv.classList.add("txt");

  const taskTitle = document.createElement("h1");
  taskTitle.textContent = taskText;

  const taskTime = document.createElement("p");
  taskTime.textContent = "Today";

  txtDiv.appendChild(taskTitle);
  txtDiv.appendChild(taskTime);

  const checkboxDiv = document.createElement("div");
  checkboxDiv.classList.add("checkbox");

  const radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.classList.add("checkbox");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");

  const deleteIcon = document.createElement("img");
  deleteIcon.classList.add("icon");
  deleteIcon.src = "./icons/akar-icons_trash-can.png";
  deleteIcon.alt = "Delete";

  deleteButton.appendChild(deleteIcon);

  deleteButton.addEventListener("click", () => {
    removeTask(taskText);
    taskLi.remove();
  });

  checkboxDiv.appendChild(radioInput);
  checkboxDiv.appendChild(deleteButton);
  taskLi.appendChild(txtDiv);
  taskLi.appendChild(checkboxDiv);
  taskUl.appendChild(taskLi);
};

const removeTask = (taskText) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.reduce((result, task) => {
    if (task !== taskText) result.push(task);
    return result;
  }, []);
  saveTasks(tasks);
};

const addTask = () => {
  const taskText = searchInput.value.trim();
  if (taskText === "") return;
  searchInput.value = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);

  saveTasks(tasks);
  addTaskToUl(taskText);
};

addButton.addEventListener("click", addTask);

loadTasks();
