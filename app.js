const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public/chatapp')))

io.on('connection', function(socket) {
  console.log('a user connected (ID)')
  socket.on('chat message', function(userid, msg) {
    io.emit('chat message', userid, msg)
  })
  socket.on('disconnect', function() {
    console.log('user disconnected')
  })
})

server.listen(3000, () => {
  console.log('Listening op port 3000')
})
