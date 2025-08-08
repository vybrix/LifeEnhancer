const goalInput = document.getElementById('goalInput');
const addGoalBtn = document.getElementById('addGoal');
const goalList = document.getElementById('goalList');

addGoalBtn.addEventListener('click', () => {
  const text = goalInput.value.trim();
  if (text === '') return;

  addGoal(text);
  goalInput.value = '';
});

function addGoal(text) {
  const card = document.createElement('div');
  card.className = 'goal-card';

  const span = document.createElement('span');
  span.className = 'goal-text';
  span.textContent = text;

  const actions = document.createElement('div');
  actions.className = 'goal-actions';

  const checkBtn = document.createElement('button');
  checkBtn.className = 'check-btn';
  checkBtn.innerHTML = '✔';
  checkBtn.title = 'Mark as done';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '✖';
  deleteBtn.title = 'Delete';

  checkBtn.addEventListener('click', () => {
    span.classList.toggle('done');
  });

  deleteBtn.addEventListener('click', () => {
    card.remove();
  });

  actions.appendChild(checkBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(span);
  card.appendChild(actions);

  goalList.appendChild(card);
}
