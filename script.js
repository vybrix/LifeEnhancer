// loading fade
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').remove();
    document.querySelector('.dashboard').classList.remove('hidden');
  }, 3000);
});

// nav toggles
const views = { overview: 0, goals: 1, stats: 2 };
const sections = [
  document.querySelector('.overview-view'),
  document.querySelector('.goals-view'),
  document.querySelector('.stats-view'),
];
document.querySelectorAll('.nav-btn').forEach((btn, i) => {
  btn.onclick = () => {
    document.querySelector('.nav-btn.active').classList.remove('active');
    btn.classList.add('active');
    sections.forEach((sec, idx) => {
      sec.classList.toggle('hidden', idx !== i);
    });
  };
});

// streak and goals logic (like before)
let goals = JSON.parse(localStorage.getItem('goals')||'[]');
let streak = parseInt(localStorage.getItem('streak')||'0');
let lastVisit = localStorage.getItem('lastVisit');
const today = new Date().toDateString();
if (lastVisit !== today) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  streak = lastVisit === yesterday.toDateString() ? streak + 1 : 1;
  localStorage.setItem('streak', streak);
  localStorage.setItem('lastVisit', today);
}
document.getElementById('streak-count').textContent = streak;

function updateCompletion() {
  const done = goals.filter(g=>g.done).length;
  const rate = goals.length ? Math.round(done/goals.length*100) : 0;
  document.getElementById('completion-rate').textContent = rate + '%';
}
updateCompletion();

function renderGoals() {
  const list = document.getElementById('goal-list');
  list.innerHTML = '';
  goals.forEach((g,i) => {
    const card = document.createElement('div');
    card.className = 'goal-card' + (g.done ? ' done' : '');
    card.innerHTML = `<span>${g.text}</span><button>Toggle</button>`;
    card.querySelector('button').onclick=()=>{
      g.done=!g.done;
      localStorage.setItem('goals', JSON.stringify(goals));
      updateCompletion(); renderGoals();
    };
    list.appendChild(card);
  });
}
renderGoals();

document.getElementById('add-goal').onclick = () => {
  const txt = document.getElementById('goal-input').value.trim();
  if (!txt) return;
  goals.push({text:txt,done:false});
  localStorage.setItem('goals', JSON.stringify(goals));
  document.getElementById('goal-input').value = '';
  renderGoals(); updateCompletion();
};

// theme toggle
document.getElementById('toggle-theme').onclick = () => {
  document.body.classList.toggle('light-mode');
};
