const input = document.getElementById('goal-input');
const addBtn = document.getElementById('add-goal');
const list = document.getElementById('goal-list');

let goals = JSON.parse(localStorage.getItem('goals')) || [];

function renderGoals() {
  list.innerHTML = '';
  goals.forEach((g, i) => {
    const li = document.createElement('li');
    li.className = 'goal-item' + (g.done ? ' goal-completed' : '');
    li.innerHTML = `
      <span>${g.text}</span>
      <button class="complete-btn">${g.done ? 'Undo' : 'Done'}</button>
    `;
    li.querySelector('.complete-btn').onclick = () => {
      goals[i].done = !goals[i].done;
      localStorage.setItem('goals', JSON.stringify(goals));
      renderGoals();
    };
    list.appendChild(li);
  });
}

addBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  goals.push({ text, done: false });
  localStorage.setItem('goals', JSON.stringify(goals));
  input.value = '';
  renderGoals();
};

renderGoals();
