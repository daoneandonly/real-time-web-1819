const socket = io()
const picture = document.querySelector('.picture')
const gridSize = 24
const defaultColor = '#000000'
const colorValue = { value: defaultColor }
const userName = document.querySelector('.overlay input[type=text]').focus()

const nameForm = document.querySelector('.overlay form')

nameForm.addEventListener('submit', e => {
  e.preventDefault()
  let nameElement = document.querySelector('.overlay input[type=text]')
  let name = nameElement.value
  console.log(name)
  nameElement.value = ''
  let overlay = document.querySelector('.overlay')
  overlay.parentNode.removeChild(overlay)
})

socket.on('assign color', colorData => {
  console.log(colorData)
  console.log(
    'You got assigned the color ' +
      "'" +
      colorData.name +
      "'" +
      ' with hexcode ' +
      colorData.value
  )
  colorValue.value = colorData.value
  let teamName = document.createElement('p')
  teamName.style = 'color: ' + colorData.value
  teamName.textContent = 'You are in team ' + colorData.name
  document.querySelector('aside').appendChild(teamName)
})

function changeColor(e) {
  let block = e.target
  block.style = 'background-color: ' + colorValue.value + ';'
  socket.emit('change color', block.classList.value, colorValue.value)
}

for (let i = 0; i < gridSize; i++) {
  let row = document.createElement('div')
  row.classList.add('row' + i)
  for (let ii = 0; ii < gridSize; ii++) {
    let cell = document.createElement('div')
    cell.classList.add('row' + i + 'cell' + ii)
    cell.addEventListener('click', e => {
      changeColor(e)
    })
    row.appendChild(cell)
  }
  picture.appendChild(row)
}

socket.on('change color', function(location, color) {
  let colorCell = document.querySelector('.' + location)
  colorCell.style = 'background-color: ' + color
})

socket.on('active users', users => {
  let userCount = document.querySelector('.count')
  userCount.textContent = users
})
