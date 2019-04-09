var socket = io()
var form = document.querySelector('form')
var message = document.querySelector('#m')
var user = Math.floor(Math.random() * 1000 + 1)

form.addEventListener('submit', e => {
  e.preventDefault()
  socket.emit('chat message', user, m.value)
  m.value = ''
  m.focus()
  return false
})

socket.on('Identity', function(a) {
  console.log(a)
  user = a
})

socket.on('chat message', function(userid, msg) {
  var li = document.createElement('li')
  var litext = document.createTextNode('User ' + userid + ': ' + msg)
  li.appendChild(litext)
  document.querySelector('#messages').appendChild(li)
})
