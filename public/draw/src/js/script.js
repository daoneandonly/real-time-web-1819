var picture = document.querySelector('.picture')
var gridSize = 24

function changeColor(e) {
  let block = e.target
  block.style = 'background-color: black;'
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
