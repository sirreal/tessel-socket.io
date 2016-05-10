(function() {
  const $ = document.querySelector.bind(document)
  const socket = io()

  $('#jsBlink').addEventListener('click', () => {
    socket.emit('blink')
  })
})()
