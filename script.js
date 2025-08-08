const greeting = document.getElementById("greeting");
const dayText = document.getElementById("dayText");
const dateText = document.getElementById("currentDate");
const goalList = document.getElementById("goalList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const themes = {
  Monday: "Reset day",
  Tuesday: "Build day",
  Wednesday: "Reflect day",
  Thursday: "Push day",
  Friday: "Finish strong",
  Saturday: "Breathe",
  Sunday: "Prep"
};

function updateDateAndDay() {
  const now = new Date();
  const day = weekdays[now.getDay()];
  greeting.textContent = `Good Morning`;
  dayText.textContent = `It’s ${day}. ${themes[day]}.`;
  dateText.textContent = now.toDateString();
}

function addGoal() {
  const input = document.getElementById("newGoal");
  const goalText = input.value.trim();
  if (goalText === "") return;

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = updateProgress;

  const span = document.createElement("span");
  span.textContent = goalText;

  li.appendChild(checkbox);
  li.appendChild(span);
  goalList.appendChild(li);

  input.value = "";
  updateProgress();
}

function updateProgress() {
  const goals = goalList.querySelectorAll("li");
  const checked = goalList.querySelectorAll("input[type='checkbox']:checked");
  const percent = goals.length > 0 ? Math.round((checked.length / goals.length) * 100) : 0;

  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${percent}% Complete`;
}

updateDateAndDay();
