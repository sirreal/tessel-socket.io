/**
 * Credit:
 * http://codepen.io/keithpickering/pen/EaZGQE
 */
import CSS from './Switch.css'
import React, { PropTypes } from 'react'

function Switch(props) {
  const status = props.active ? 'on' : 'off'
  return <button className={ `${CSS.Switch} ${CSS[status]}` } {...props}></button>
}

Switch.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export { Switch, Switch as default }
