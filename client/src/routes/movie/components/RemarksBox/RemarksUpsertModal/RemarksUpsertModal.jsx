import React from 'react'
import { DeniReactModal, Button } from 'deni-react-modal'
import './RemarksUpsertModal.scss'
import RemarksUpsertModalContent from './RemarksUpsertModalContent'
import MovieService from '../../../MovieService'

class RemarksUpsertModal extends DeniReactModal {

  constructor(movieId, currentSecond, remark, callbackFn) {
    super()
    this.movieId = movieId
    this.currentSecond = currentSecond
    this.remark = remark
    this.editing = this.remark ? true : false
    this.callbackFn = callbackFn
  }

  getConfig() {
    const _self = this
    return {
      title: 'Remarks - ' + (this.editing ? 'editing' : 'adding'),
      width: '600px',
      height: '640px',
      buttons: [
        Button.CANCEL,
        Button.OK
      ]
    }
  }

  handleChange(value) {
    //this.setState({ text: value })
  }

  async modalConfirm(modalBody, button) {
    if (button === Button.OK) {
      const data = this.contentElem.getValue()
      const normalizeData = this._normalizeDataToServer(data)
      const movieRemarkFn = this.editing ? MovieService.updMovieRemark : MovieService.addMovieRemark
      const record = await movieRemarkFn(normalizeData)
      this.callbackFn(record.data)
    }
  }

  render() {
    return (
      <div className="remarks-upsert-modal-container">
        <RemarksUpsertModalContent ref={elem => this.contentElem = elem} remark={this.remark} currentSecond={this.currentSecond} />
      </div>
    )
  }

  _normalizeDataToServer(data) {
    return {
      id: this.remark ? this.remark._id : undefined,
      movieId: this.movieId,
      start: this._timeToSeconds(data.start),
      end: this._timeToSeconds(data.end),
      remarks: data.remarks
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

export default RemarksUpsertModal