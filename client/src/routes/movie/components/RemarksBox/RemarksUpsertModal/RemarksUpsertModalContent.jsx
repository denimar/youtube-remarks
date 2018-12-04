import React from 'react'
import TimeInput from '../../../../../ui/TimeInput'
import ReactQuill from 'react-quill'
import { arrowsH } from 'react-icons-kit/fa/arrowsH'
import Icon from 'react-icons-kit'
import moment from 'moment'

class RemarksUpsertModalContent extends React.Component {

  constructor(props) {
    super(props)
    const startTimeInSeconds = props.currentSecond || 0
    const start = this._formatTime(startTimeInSeconds)
    const end = this._formatTime(startTimeInSeconds + 5) //five seconds
    this.state = { start, end, remarks: '' }
    this.wysiwygModules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ color: [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['image']
      ],
    }
    /*
    this.wysiwygFormats = [
      'bold', 'italic', 'underline', 'blockquote', 'color',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]
    */
  }

  getValue() {
    return this.state
  }

  componentDidMount() {
    if (this.props.remark) {
      const record = this.props.remark._source
      this.setState({
        start: this._formatTime(record.start),
        end: this._formatTime(record.end),
        remarks: record.remarks,
      })
    }
  }

  handleWYSIWYGChange(value) {
    this.setState({ remarks: value })
  }

  handleStartTimeInputChange(newValue) {
    this.setState({ start: newValue })
  }

  handleEndTimeInputChange(newValue) {
    this.setState({ end: newValue })
  }

  render() {
    return (
      <fieldset>
        <div className="input-times">
          <TimeInput value={this.state.start} onChange={this.handleStartTimeInputChange.bind(this)} />
          <Icon icon={arrowsH} size={14} />
          <TimeInput value={this.state.end} onChange={this.handleEndTimeInputChange.bind(this)} />
        </div>
        <ReactQuill
          placeholder="Type the remark here"
          value={this.state.remarks}
          onChange={this.handleWYSIWYGChange.bind(this)}
          modules={this.wysiwygModules}
        />
      </fieldset>
    )
  }

  _formatTime(timeInSeconds) {
    const secondsInFloat = parseFloat(timeInSeconds)
    const timeInMiliseconds = secondsInFloat * 1000
    const formatted = moment.utc(timeInMiliseconds).format("HH:mm:ss")
    return formatted
  }


}

export default RemarksUpsertModalContent