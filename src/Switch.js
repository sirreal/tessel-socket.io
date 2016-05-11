/**
 * Credit:
 * http://codepen.io/keithpickering/pen/EaZGQE
 */
import CSS from './Switch.css'

export default function(props) {
  const status = props.active ? 'on' : 'off'
  return <a href='#' className={ `${CSS.toggle} ${CSS[status]}` }></a>
}
