window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const app = document.getElementById('app');
  const addBtn = document.querySelector('.goal button');
  const input = document.querySelector('.goal input');
  const goalList = document.querySelector('.goal-list');

  addBtn.addEventListener('click', () => {
    const goalText = input.value.trim();
    if (goalText !== '') {
      const div = document.createElement('div');
      div.className = 'goal-item';
      div.textContent = goalText;
      goalList.appendChild(div);
      input.value = '';
    }
  });
});
