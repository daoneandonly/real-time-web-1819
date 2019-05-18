const socket = io()
const app = document.querySelector('.app')
const data = {}

function renderHome(topGames) {
  data.topGames = topGames
  topGames.forEach(game => {
    let section = document.createElement('section')
    let image = game.box_art_url.replace('{width}x{height}', '480x638')
    section.classList.add('gamecover')
    section.style = 'background-image: url(' + image + ');'
    section.innerHTML = `<a href="#"><h1> ${game.name} </h1></a>`
    section.addEventListener('click', e => {
      e.preventDefault()
      window.location.hash = game.id
      socket.emit('newList', { id: game.id, name: game.name })
    })
    app.appendChild(section)
  })
}

function renderTiles(currentGame) {
  currentGame.streamers.forEach(stream => {
    let section = document.createElement('section')
    let image = stream.thumbnail_url.replace('{width}x{height}', '480x272')
    section.classList.add('tile')
    section.style = 'background-image: url(' + image + ');'
    section.innerHTML = `<a target=_blank href="https://twitch.tv/${
      stream.user_name
    }"><h2> ${stream.user_name} </h2>
    <p> Viewers: ${stream.viewer_count} </p></a>`
    app.appendChild(section)
  })
  renderBackButton()
}

function renderBackButton() {
  let back = document.createElement('button')
  back.textContent = 'Back to overview'
  back.addEventListener('click', () => {
    window.location.hash = 'home'
  })
  app.insertBefore(back, app.children[0])
}
socket.on('renderHome', topGames => {
  // window.location.hash = '#home'
  data.topGames = topGames
  renderHome(data.topGames)
})

socket.on('streamerList', function(currentGame) {
  app.innerHTML = ''
  data.currentGame = currentGame
  renderTiles(data.currentGame)
})

window.addEventListener('hashchange', () => {
  if (window.location.hash == '#home' || window.location.hash == '') {
    app.innerHTML = ''
    renderHome(data.topGames)
  }
  // if (false) {
  //   console.log('Error')
  // app.innerHTML = ''
  // let error = document.createElement('section')
  // error.textContent = 'Page not found!'
  // app.appendChild(error)
  // renderBackButton()
  // }
})
