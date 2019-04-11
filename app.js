const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const myData = {
  count: 0,
  colors: {
    0: {
      name: 'orange',
      value: '#f35f05'
    },
    1: {
      name: 'red',
      value: '#FF0000'
    },
    2: {
      name: 'magenta',
      value: '#FF00FF'
    },
    3: {
      name: 'steelblue',
      value: '#4682B4'
    }
  }
}

const dataArr = new Array(24)
for (let i = 0; i < dataArr.length; i++) {
  dataArr[i] = new Array(24)
}

app.use(express.static(path.join(__dirname, 'public/draw')))

io.on('connection', function(socket) {
  myData.count++
  // todo: send data (array or object) here
  io.emit('active users', myData.count)
  socket.on('name', name => {
    console.log(name + ' connnected.')
    io.emit(name, myData.colors[Math.floor(Math.random() * 4)], dataArr)
  })
  socket.on('change color', function(location, color) {
    // todo: save data here
    let column = location.split('-')[0].split('c')[1]
    let row = location.split('-')[1].split('r')[1]
    dataArr[column][row] = { location: location, color: color }

    io.emit('change color', location, color)
  })
  socket.on('disconnect', () => {
    myData.count = myData.count - 1
    io.emit('active users', myData.count)
  })
})

server.listen(3000, () => {
  console.log('Listening op port 3000')
})
