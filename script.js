const form = document.getElementById('goalForm')
const input = document.getElementById('goalInput')
const list = document.getElementById('goalList')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = input.value.trim()
  if (text !== '') {
    addGoal(text)
    input.value = ''
  }
})

function addGoal(text) {
  const li = document.createElement('li')
  li.innerHTML = `
    <span>${text}</span>
    <button onclick="this.parentElement.remove()">✔</button>
  `
  list.appendChild(li)
}
