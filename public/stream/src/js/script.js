const socket = io()

socket.on('connection', () => {
  console.log('Hoi!')
})

socket.on('data', function(data) {
  data.data.forEach(stream => {
    let section = document.createElement('section')
    let body = document.querySelector('body')
    let image = stream.thumbnail_url.replace('{width}x{height}', '480x272')
    section.style = 'background-image: url(' + image + ');'
    section.innerHTML = `<h2> ${stream.user_name} </h2>
    <p> Viewers: ${stream.viewer_count} </p>`
    body.appendChild(section)
  })
  console.log(JSON.stringify(data.data))
})
