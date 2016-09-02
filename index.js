'use strict'
const tessel = require('tessel')
const express = require('express')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const ambientLib = require('ambient-attx4')
const servoLib = require('servo-pca9685')

const ambient = ambientLib.use(tessel.port['A'])
const servo = servoLib.use(tessel.port['B'])
const servoPos = 1
const soundThreshold = 0.08

var servoMove = () => {}

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
sharedState.soundGraph = []
sharedState.alertSounded = false



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

const resetAlert = () => {
  if (sharedState.alertSounded) {
    sharedState.alertSounded = false
    servoMove(0)
  }
}
const rangeChange = (v) => {
  sharedState.range = v
  servoMove(v)
  stateChange()
}

app.get('/client.js', function(req, res){
  res.sendFile(__dirname + '/dist/client.js')
})

app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/dist/style.css')
})

app.get('/', function(req, res){
  connectionVis()
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
  socket.emit('stateChange', sharedState)
  socket.on('toggleLed', toggleLed)
  socket.on('resetAlert', resetAlert)
  socket.on('rangeChange', rangeChange)
})

http.listen(80, function() {
  console.log('Listening on :80')
})

ambient.on('ready', function () {

  setInterval( () => {

    ambient.getSoundLevel( (err, sounddata) => {

      if (err) throw err;

      //const lastSound = sounddata.toFixed(8)
      //console.log(`Sound: ${lastSound}`)
      sharedState.soundGraph.push(sounddata)
      if (!sharedState.alertSounded && sounddata > soundThreshold) {
        sharedState.alertSounded = true
        servoMove(1)
      }
      stateChange()

    })

  }, 500)

})

servo.on('ready', () => {
  servo.configure(servoPos, 0.05, 0.12, () => {
    servoMove = (pos) => {
      if (pos > 1) {
        servo.move(servoPos, 1)
      }
      else if (pos < 0) {
        servo.move(servoPos, 0)
      }
      servo.move(servoPos, pos)
    }
    servoMove(sharedState.alertSounded ? 1 : 0)
  })
})
