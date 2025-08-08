// Clock
function updateClock(){
  const now = new Date();
  const h = now.getHours()%12;
  const m = now.getMinutes();
  const s = now.getSeconds();

  document.getElementById('hour').style.transform = `rotate(${h*30 + m*0.5}deg)`;
  document.getElementById('minute').style.transform = `rotate(${m*6}deg)`;
  document.getElementById('second').style.transform = `rotate(${s*6}deg)`;

  document.getElementById('digital-clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Streaks and weekly score
let goals = JSON.parse(localStorage.getItem('goals')||'[]');
const today = new Date().toDateString();
let lastDay = localStorage.getItem('lastDay'), streak=+localStorage.getItem('streak')||0;

if(lastDay!==today){
  if(lastDay === new Date(Date.now() -864e5).toDateString()) streak++; else streak=1;
  localStorage.setItem('streak',streak);
  localStorage.setItem('lastDay',today);
}
document.getElementById('streak').textContent = streak;

function updateWeeklyScore(){
  const week = goals.filter(g=> new Date(g.date)>= new Date(Date.now() - 7*864e5));
  const done = week.filter(g=>g.done).length;
  const score = week.length? Math.round(done/week.length*100):0;
  document.getElementById('weekly-score').textContent = score+'%';
}

// Daily test
const questions = [
  "Will today be productive?",
  "Will you work on your goal for at least 30min?",
  "Will you avoid distractions today?"
];
let qIdx = 0;
document.getElementById('test-question').textContent = questions[qIdx];
document.getElementById('test-yes').onclick = handleTest;
document.getElementById('test-no').onclick = handleTest;
function handleTest(){
  if(++qIdx < questions.length){
    document.getElementById('test-question').textContent = questions[qIdx];
  } else {
    // generate recommended list
    alert('Here’s your recommended list for today!')
    document.querySelector('.daily-test').remove();
  }
}

// Goals list
const input = document.getElementById('goal-input'), list = document.getElementById('goal-list');
document.getElementById('add-goal').onclick = ()=> {
  const text = input.value.trim();
  if(!text) return;
  const g={text,done:false,date:new Date().toISOString()};
  goals.push(g);
  localStorage.setItem('goals', JSON.stringify(goals));
  renderGoals();
  input.value='';
  updateWeeklyScore();
}

function renderGoals(){
  list.innerHTML='';
  goals.forEach((g,i)=>{
    const li = document.createElement('li');
    li.className='goal-item'+(g.done?' done':'');
    li.innerHTML = `<span>${g.text}</span>
      <div class="goal-actions">
        <button onclick="toggleDone(${i})">✔</button>
        <button onclick="removeGoal(${i})">✖</button>
      </div>`;
    list.appendChild(li);
  });
}
function toggleDone(i){ goals[i].done=!goals[i].done; saveAll(); }
function removeGoal(i){ goals.splice(i,1); saveAll(); }
function saveAll(){ localStorage.setItem('goals', JSON.stringify(goals)); renderGoals(); updateWeeklyScore();}
renderGoals();
updateWeeklyScore();
