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
        streamData.currentGame = {}
        streamData.currentGame.streamers = res.data.data
        streamData.currentGame.name = game.name
        streamData.currentGame.id = game.id
        socket.emit('streamerList', streamData.currentGame)
        if (streamData.currentGame) {
          console.log('User joined channel game')
          socket.join(streamData.currentGame.id)
        }
      })
      .catch(err => {
        console.log(err)
      })
  })
  // Leave a room
  socket.on('leave', id => {
    socket.leave(id)
    console.log('user has left channel: ' + id)
  })
  // requesting data for polling
  socket.on('requestData', id => {
    let tempData = {}
    axios
      .get(
        'https://api.twitch.tv/helix/streams?game_id=' + id + '&first=12',
        header
      )
      .then(res => {
        tempData.currentGame = {}
        tempData.currentGame.streamers = res.data.data
        tempData.currentGame.name = 'name'
        tempData.currentGame.id = id

        console.log('sending new data to room ' + id)
        io.to(id).emit('updateData', tempData.currentGame)
      })
      .catch(err => {
        console.log(err)
      })
  })
})

server.listen(process.env.PORT || 3000)
