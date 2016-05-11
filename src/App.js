import React, { Component } from 'react'
import Switch from './Switch'

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

  render() {
    return <div>
      <h1>LED is { this.state.wsLed ? 'ON' : 'off' }.</h1>
      <Switch active={ this.state.wsLed} onClick={this.toggleLed.bind(this)} />
      <button className='btn btn-primary' onClick={this.toggleLed.bind(this)} type='button'>Toggle light</button>
    </div>
  }
}
