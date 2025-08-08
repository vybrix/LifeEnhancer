// loading screen logic
setTimeout(() => {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('main').classList.remove('hidden');
}, 4000); // longer loading

// typing effect
const text = "discipline = freedom.";
let i = 0;
const speed = 100;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typed").textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
setTimeout(typeWriter, 4000); // start after loading

// goal adding logic
const addGoalBtn = document.getElementById("addGoal");
const input = document.getElementById("goalInput");
const list = document.getElementById("goalList");

addGoalBtn.addEventListener("click", () => {
  const goal = input.value.trim();
  if (goal !== "") {
    const li = document.createElement("li");
    li.textContent = goal;
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });
    list.appendChild(li);
    input.value = "";
  }
});
