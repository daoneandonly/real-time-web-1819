;(() => {
  const socket = io()
  const picture = document.querySelector('.picture')
  const gridSize = 24
  const userInfo = {
    name: undefined,
    colorName: undefined,
    colorValue: '#000000'
  }
  const userName = document.querySelector('.overlay input[type=text]')
  const nameForm = document.querySelector('.overlay form')

  //focus on text field on pageload
  userName.focus()

  //read textfield and remove elements
  nameForm.addEventListener('submit', e => {
    e.preventDefault()
    let nameElement = document.querySelector('.overlay input[type=text]')
    let name = nameElement.value
    nameElement.value = ''
    //remove overlay
    let overlay = document.querySelector('.overlay')
    overlay.parentNode.removeChild(overlay)
    //
    userInfo.name = name
    socket.emit('name', name)
    //receive team color and name as object
    socket.on(name, colorData => {
      userInfo.colorValue = colorData.value
      let teamName = document.querySelector('.team')
      teamName.style = 'color: ' + colorData.value
      teamName.textContent = colorData.name
    })
  })

  function changeColor(location, color) {
    let cell = document.querySelector('.' + location)
    cell.style = 'background-color: ' + color + ';'
  }

  //create rows and columns
  for (let i = 0; i < gridSize; i++) {
    let column = document.createElement('div')
    column.classList.add('column' + i)
    for (let ii = 0; ii < gridSize; ii++) {
      let row = document.createElement('div')
      row.classList.add('r' + i + 'c' + ii)
      //add eventlistener that changes the color on clicks
      row.addEventListener('click', e => {
        changeColor(e.target.classList.value, userInfo.colorValue)
        socket.emit(
          'change color',
          e.target.classList.value,
          userInfo.colorValue
        )
      })
      column.appendChild(row)
    }
    picture.appendChild(column)
  }

  socket.on('change color', function(location, color) {
    changeColor(location, color)
  })

  socket.on('active users', users => {
    let userCount = document.querySelector('.count')
    userCount.textContent = users
  })
})()
