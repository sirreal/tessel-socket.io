'use strict'
const tessel = require('tessel')
const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const connectionVis = () => {
  let connectionLedTimeout
  const connectionLed = tessel.led[2]

  return () => {
    connectionLed.on()
    connectionLedTimeout = setTimeout(() => connectionLed.off(), 200)
  }
}()

const sharedState = Object.create(null)
sharedState.wsLed = false

const toggleLed = (function() {
  const wsLed = tessel.led[3]

  return () => {
    if (sharedState.wsLed) {
      wsLed.off()
    } else {
      wsLed.on()
    }

    sharedState.wsLed = !sharedState.wsLed
    stateChange()
  }
})()

const stateChange = () => io.emit('stateChange', sharedState)


app.get('/client.js', function(req, res){
  res.sendFile(__dirname + '/dist/client.js')
})

app.get('/', function(req, res){
  connectionVis()
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
  socket.emit('stateChange', sharedState)
  socket.on('toggleLed', toggleLed)
})

http.listen(80, function() {
  console.log('Listening on :80')
})
