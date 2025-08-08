// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.onclick = () => {
    document.querySelector('.tab-btn.active').classList.remove('active');
    btn.classList.add('active');
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.getElementById(btn.dataset.tab).classList.add('active');
  }
});

// Calendar grid (current month)
const calendar = document.getElementById('calendarGrid');
const now = new Date(), year = now.getFullYear(), month = now.getMonth();
const firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month+1, 0).getDate();
for(let i=0; i<firstDay; i++){
  calendar.append(document.createElement('div'));
}
for(let d=1; d<=daysInMonth; d++){
  const day = document.createElement('div');
  day.className = 'day';
  day.textContent = d;
  calendar.append(day);
}

// Goal logic + streak + weekly average
let goals = JSON.parse(localStorage.getItem('goals')||'[]');
const list = document.getElementById('goal-list');
const input = document.getElementById('goal-input');
const streakEl = document.getElementById('streak');
const weeklyEl = document.getElementById('weekly-score');

function save(){ localStorage.setItem('goals', JSON.stringify(goals)); }
function calcStreak(){ /* ...similar previous logic... */ }
function calcWeekly(){ /* recalc weekly score */ }
function renderGoals(){
  list.innerHTML='';
  goals.forEach((g,i)=>{
    const li=document.createElement('li');
    li.className='goal-item'+(g.done?' done':'');
    li.innerHTML=`<span>${g.text}</span><div>
      <button onclick="toggle(${i})">✔</button>
      <button onclick="remove(${i})">✖</button>
    </div>`;
    list.appendChild(li);
  });
}

window.toggle=(i)=>{ goals[i].done=!goals[i].done; save(); renderGoals(); updateStats(); };
window.remove=(i)=>{ goals.splice(i,1); save(); renderGoals(); updateStats(); };

document.getElementById('add-goal').onclick=()=>{
  if(!input.value.trim())return;
  goals.push({text:input.value,done:false,date:new Date().toISOString()});
  input.value=''; save(); renderGoals(); updateStats();
};

function updateStats(){
  calcStreak();
  calcWeekly();
  renderGoals();
  drawChart();
}

// Weekly Chart with Chart.js
const ctx = document.getElementById('weeklyChart');
const chart = new Chart(ctx, { type:'line', data:{labels:[],datasets:[{label:'Done %',data:[], borderColor:'#ddd'}]}, options:{} });
function drawChart(){
  const last7=goals.filter(g=> new Date(g.date)>= new Date(Date.now()-6*864e5));
  const labels=last7.map((_,i)=>`Day ${i+1}`);
  const data=last7.map((g,i)=>Math.round((last7.slice(0,i+1).filter(x=>x.done).length)/(i+1)*100));
  chart.data.labels=labels;
  chart.data.datasets[0].data=data;
  chart.update();
}

renderGoals();
updateStats();
drawChart();
