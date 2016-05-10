'use strict'
const tessel = require('tessel')

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

console.log(tessel.led)


const connectionVis = () => {
  let connectionLedTimeout
  const connectionLed = tessel.led[2]

  return () => {
    connectionLed.on()
    connectionLedTimeout = setTimeout(() => connectionLed.off(), 200)
  }
}()

const wsVis = () => {
  let wsLedTimeout
  const wsLed = tessel.led[3]

  return () => {
    wsLed.on()
    wsLedTimeout = setTimeout(() => wsLed.off(), 200)
  }
}()

app.get('/client.js', function(req, res){
  res.sendFile(__dirname + '/client.js')
})

app.get('/', function(req, res){
  connectionVis()
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
  socket.on('blink', wsVis)

})

http.listen(80, function() {
  console.log('Listening on :80')
})


