const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const axios = require('axios')
const header = {
  headers: { 'Client-ID': 'z79wro6y3mydfh153v7fnaf2kquc5z' }
}
const streamData = {}

app.use(express.static(path.join(__dirname, 'public/stream')))

axios
  .get('https://api.twitch.tv/helix/games/top?first=20', header)
  .then(res => {
    streamData.topGames = res.data.data
  })
  .catch(err => {
    console.log(err)
  })

io.on('connection', function(socket) {
  console.log('New connection established.')

  socket.emit('renderHome', streamData.topGames)

  socket.on('newList', game => {
    axios
      .get(
        'https://api.twitch.tv/helix/streams?game_id=' + game.id + '&first=12',
        header
      )
      .then(res => {
        streamData.data = res.data.data
        streamData.currentGame = game.name
        socket.emit('streamerList', streamData)
      })
      .catch(err => {
        console.log(err)
      })
  })
})

server.listen(process.env.PORT || 3000)
