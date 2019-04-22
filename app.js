const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const axios = require('axios')
const header = {
  headers: { 'Client-ID': 'z79wro6y3mydfh153v7fnaf2kquc5z' }
}

app.use(express.static(path.join(__dirname, 'public/stream')))

io.on('connection', function(socket) {
  console.log('a user has connected.')
  axios
    .get('https://api.twitch.tv/helix/streams?game_id=32399&first=4', header)
    .then(res => {
      socket.emit('data', res.data)
    })
    .catch(err => {
      console.log(err)
    })
})

server.listen(3000)
