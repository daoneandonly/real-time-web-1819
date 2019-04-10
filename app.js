const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public/draw')))

io.on('connection', function(socket) {
  socket.on('change color', function(location) {
    io.emit('change color', location)
  })
})

server.listen(3000, () => {
  console.log('Listening op port 3000')
})
