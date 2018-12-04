import React from 'react'
import './TimeInput.scss'
import { SSL_OP_NO_QUERY_MTU } from 'constants';

class TimeInput extends React.Component {

  constructor(props) {
    super(props)
    this.inFull = props.value
    const currentTime = this.inFull.split(':')
    const hours = parseInt(currentTime[0])
    const minutes = parseInt(currentTime[1])
    const seconds = parseInt(currentTime[2])
    this.state = { hours, minutes, seconds }
  }

  componentDidUpdate(props) {
    if (props.value !== this.inFull) {
      this.inFull = props.value
      this.setValue(props.value)
    }
  }

  getValue() {
    /*
    const hours = this.state.hours.toString().padStart(2, "0")
    const minutes = this.state.minutes.toString().padStart(2, "0")
    const seconds = this.state.seconds.toString().padStart(2, "0")
    return hours + ':' + minutes + ':' + seconds
    */
    const hours = this.hoursElem.value.padStart(2, '0')
    const minutes = this.minutesElem.value.padStart(2, '0')
    const seconds = this.secondsElem.value.padStart(2, '0')
    return hours + ':' + minutes + ':' + seconds
  }

  setValue(newTime) {
    const newTimeArray = newTime.split(':')
    const hours = parseInt(newTimeArray[0])
    const minutes = parseInt(newTimeArray[1])
    const seconds = parseInt(newTimeArray[2])
    this.setState({ hours, minutes, seconds })
  }

  onChangeInputNumbers(index, event) {
    const intValue = parseInt(event.target.value)
    if (intValue > 59) {
      this._undoInputValue(event.target, index)
    } else {
      this._updateInputValue(event.target, index, intValue)
      if (this.props.onChange) {
        this.props.onChange(this.getValue())
      }
    }
  }

  onMouseUpInputNumbers(event) {
    event.target.select()
  }

  render() {
    return (
      <div className="time-input-container">
        <input ref={elem => this.hoursElem = elem} value={this.state.hours.toString().padStart(2, "0")} type="number" onChange={this.onChangeInputNumbers.bind(this, 0)} onMouseUp={this.onMouseUpInputNumbers.bind(this)} />
        <span>:</span>
        <input ref={elem => this.minutesElem = elem} value={this.state.minutes.toString().padStart(2, "0")} type="number" onChange={this.onChangeInputNumbers.bind(this, 1)} onMouseUp={this.onMouseUpInputNumbers.bind(this)} />
        <span>:</span>
        <input ref={elem => this.secondsElem = elem} value={this.state.seconds.toString().padStart(2, "0")} type="number" onChange={this.onChangeInputNumbers.bind(this, 2)} onMouseUp={this.onMouseUpInputNumbers.bind(this)} />
      </div>
    )
  }

  _undoInputValue(inputElem, index) {
    switch (index) {
      case 0:
        inputElem.value = this.state.hours
        break;
      case 1:
        inputElem.value = this.state.minutes
        break;
      case 2:
        inputElem.value = this.state.seconds
        break;
      default:
        break;
    }
    inputElem.select()
  }

  _updateInputValue(inputElem, index, newValue) {
    switch (index) {
      case 0:
        this.setState({ hours: newValue })
        break;
      case 1:
        this.setState({ minutes: newValue })
        break;
      case 2:
        this.setState({ seconds: newValue })
        break;
      default:
        break;
    }
  }

  _timeToSeconds(time) {
    const timeArr = time.split(':')
    const hoursInSeconds = parseInt(timeArr[0]) * 60 * 60
    const minutesInSeconds = parseInt(timeArr[1]) * 60
    const seconds = parseInt(timeArr[2])
    return hoursInSeconds + minutesInSeconds + seconds
  }

}

export default TimeInput