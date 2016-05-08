'use strict'
const tessel = require('tessel')

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

console.log(tessel.led)

const connectionLed = tessel.led[2]

const connectionVis = () => {
  let connectionLedTimeout

  return () => {
    connectionLed.on()
    connectionLedTimeout = setTimeout(() => connectionLed.off(), 200)
  }
}()

app.use(express.static('public'))


app.get('/', function(req, res){
  connectionVis()
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
  console.log('a user connected')

  socket.on('disconnect', function(){
    console.log('user disconnected')
  })

})

http.listen(80, function() {
  console.log('Listening on :80')
})

