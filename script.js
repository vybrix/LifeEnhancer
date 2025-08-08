// LOADING SCREEN
window.addEventListener('load', () => {
  const overlay = document.getElementById('loadingOverlay');
  overlay.style.transition = 'opacity 0.5s ease';
  overlay.style.opacity = '0';
  setTimeout(() => overlay.remove(), 600);
});

// GOALS APP
const input = document.getElementById("goalInput");
const list = document.getElementById("goalList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function updateProgress() {
  if (goals.length === 0) {
    progressBar.style.width = "0%";
    progressText.textContent = "0% done";
    return;
  }

  const completed = goals.filter(g => g.done).length;
  const percent = Math.round((completed / goals.length) * 100);
  progressBar.style.width = percent + "%";
  progressText.textContent = `${percent}% done`;
}

function renderGoals() {
  list.innerHTML = "";
  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = goal.done;
    checkbox.onchange = () => {
      goals[index].done = !goals[index].done;
      saveGoals();
      updateProgress();
      renderGoals();
    };

    const span = document.createElement("span");
    span.textContent = goal.text;

    li.appendChild(checkbox);
    li.appendChild(span);
    list.appendChild(li);
  });

  updateProgress();
}

function addGoal() {
  const text = input.value.trim();
  if (text === "") return;
  goals.push({ text, done: false });
  input.value = "";
  saveGoals();
  renderGoals();
}

renderGoals();
