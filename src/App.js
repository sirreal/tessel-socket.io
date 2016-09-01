import React, { Component } from 'react'
import Switch from './Switch'

import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wsLed: false,
    }
  }

  componentWillMount() {
    this.socket = io()
    this.socket.on('stateChange', s => this.setState(s))
  }

  toggleLed() {
    this.socket.emit('toggleLed')
  }

  resetAlert() {
    this.socket.emit('resetAlert')
  }

  render() {
    return <div>
      <h1>LED is { this.state.wsLed ? 'ON' : 'off' }.</h1>
      <Switch active={ this.state.wsLed} onClick={ this.toggleLed.bind(this) } />
      <button
        onClick={ this.resetAlert.bind(this) }
        disabled={ !this.state.alertSounded }>
          Reset sound alert
      </button>
    </div>
  }
}
