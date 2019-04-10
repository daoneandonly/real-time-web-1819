var socket = io()
var picture = document.querySelector('.picture')
var gridSize = 24
var currentColor = document.querySelector('input[type=color]')
var colorValue = currentColor.value

currentColor.addEventListener('change', () => {
  colorValue = currentColor.value
})

function changeColor(e) {
  let block = e.target
  block.style = 'background-color: ' + colorValue + ';'
  socket.emit('change color', block.classList.value)
}

for (var i = 0; i < gridSize; i++) {
  let row = document.createElement('div')
  row.classList.add('row' + i)
  for (var ii = 0; ii < gridSize; ii++) {
    let cell = document.createElement('div')
    cell.classList.add('row' + i + 'cell' + ii)
    cell.addEventListener('click', e => {
      console.log(e)
      changeColor(e)
    })
    row.appendChild(cell)
  }
  picture.appendChild(row)
}

socket.on('change color', function(location) {
  console.log('New Cell to be colored ' + location)
  let colorCell = document.querySelector('.' + location)
  colorCell.style = 'background-color: black;'
})
