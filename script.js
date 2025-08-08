const input = document.getElementById('goalInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('goalList');

addBtn.onclick = () => {
  const value = input.value.trim();
  if (value === '') return;

  const card = document.createElement('div');
  card.className = 'card';

  const text = document.createElement('p');
  text.textContent = value;

  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '✕';
  removeBtn.onclick = () => card.remove();

  const doneBtn = document.createElement('button');
  doneBtn.innerHTML = '✔';
  doneBtn.onclick = () => card.classList.toggle('done');

  card.appendChild(text);
  card.appendChild(doneBtn);
  card.appendChild(removeBtn);
  list.prepend(card);

  input.value = '';
};
