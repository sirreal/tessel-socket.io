const noop = () => {}
const fakeLed = { on: noop, off: noop }

module.exports = {
  led: [ fakeLed, fakeLed, fakeLed, fakeLed ]
}
