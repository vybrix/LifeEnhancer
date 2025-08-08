setTimeout(() => {
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}, 3000);

const now = new Date();
document.getElementById('current-date').textContent = now.toDateString();

let lastVisit = localStorage.getItem('lastVisit');
let streak = parseInt(localStorage.getItem('streak') || 0);
const today = new Date().toDateString();

if (lastVisit !== today) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (lastVisit === yesterday.toDateString()) {
    streak++;
  } else {
    streak = 1;
  }
  localStorage.setItem('lastVisit', today);
  localStorage.setItem('streak', streak);
}

document.getElementById('streak-count').textContent = streak;

const addGoalBtn = document.getElementById('add-goal');
const goalText = document.getElementById('goal-text');
const goalList = document.getElementById('goal-list');

let goals = JSON.parse(localStorage.getItem('goals') || '[]');
renderGoals();

addGoalBtn.onclick = () => {
  const text = goalText.value.trim();
  if (!text) return;

  goals.push({ text, done: false });
  localStorage.setItem('goals', JSON.stringify(goals));
  goalText.value = '';
  renderGoals();
};

function renderGoals() {
  goalList.innerHTML = '';
  goals.forEach((goal, i) => {
    const card = document.createElement('div');
    card.className = 'goal-card' + (goal.done ? ' done' : '');
    card.innerHTML = `
      <span>${goal.text}</span>
      <div class="goal-actions">
        <button class="complete-btn">${goal.done ? 'Undo' : 'Done'}</button>
        <button class="remove-btn">✖</button>
      </div>
    `;

    card.querySelector('.complete-btn').onclick = () => {
      goals[i].done = !goals[i].done;
      localStorage.setItem('goals', JSON.stringify(goals));
      renderGoals();
    };

    card.querySelector('.remove-btn').onclick = () => {
      goals.splice(i, 1);
      localStorage.setItem('goals', JSON.stringify(goals));
      renderGoals();
    };

    goalList.appendChild(card);
  });
}
