import React from 'react'
import './RemarksBox.scss'
import { arrowsH } from 'react-icons-kit/fa/arrowsH'
import { ic_mode_edit } from 'react-icons-kit/md/ic_mode_edit'
import { trashO } from 'react-icons-kit/fa/trashO'
import { plus } from 'react-icons-kit/fa/plus'
import Icon from 'react-icons-kit'
import RemarksUpsertModal from './RemarksUpsertModal'
import moment from 'moment'
import MovieService from '../../MovieService'
import DeniDlg from 'deni-react-dialog'

class RemarksBox extends React.Component {

  componentDidUpdate(props) {
    if (this.remarks !== props.remarks) {
      this.remarks = props.remarks
      this.forceUpdate()
    }
  }

  async _addRemarkClick() {
    const _self = this
    const currentSecond = Math.floor(this.props.playerElm.context.media.currentTime)
    const remarksUpsertModal = new RemarksUpsertModal(this.props.movieId, currentSecond, null, async addedData => {
      _self.remarks.push(addedData)
      _self.forceUpdate()
    })
    remarksUpsertModal.show()
  }

  _editRemarkClick(remark) {
    const remarksUpsertModal = new RemarksUpsertModal(this.props.movieId, 0, remark, updatedData => {
      remark._source.start = updatedData.start
      remark._source.end = updatedData.end
      remark._source.remarks = updatedData.remarks
      this.forceUpdate()
    })
    remarksUpsertModal.show()
  }

  async _removeRemarkClick(remark) {
    const _self = this
    DeniDlg.confirm('Are you sure?').then(async responseData => {
      if (responseData.button === 'yes') {
        const response = await MovieService.delMovieRemark(remark._id)
        if (response.data.found) {
          const removedItemIndex = _self.remarks.findIndex(rmk => rmk._id === remark._id)
          _self.remarks.splice(removedItemIndex, 1)
          _self.forceUpdate()
        } else {
          //TODO
        }
      }
    })
  }

  onClickItemTimes(remark) {
    const { start } = remark._source
    this.props.playerElm.context.media.seekTo(start)
  }

  render() {
    const remarks = (this.remarks || []).sort((item1, item2) => {
      if (item1._source.start < item2._source.start) return -1
      if (item1._source.start > item2._source.start) return 1
      return 0
    })
    return (
      <div className="remarksbox-container">
        <div className="remarksbox-header">
          <span className="remarksbox-header-title">Remarks</span>
          <Icon icon={plus} size={16} onClick={this._addRemarkClick.bind(this)} />
        </div>
        <div className="remarksbox-body">
          {
            remarks.map(remark => {
              return (
                <div className="remarksbox-item">
                  <div className="remarksbox-item-header">
                    <div className="remarksbox-item-times" onClick={this.onClickItemTimes.bind(this, remark)} >
                      <span>{this._formatTime(remark._source.start)}</span>
                      <Icon icon={arrowsH} size={14} />
                      <span>{this._formatTime(remark._source.end)}</span>
                    </div>
                    <Icon className="tool-button" icon={ic_mode_edit} size={16} onClick={this._editRemarkClick.bind(this, remark)} />
                    <Icon className="tool-button" icon={trashO} size={16} onClick={this._removeRemarkClick.bind(this, remark)} />
                  </div>
                  <div className="remarksbox-item-body" dangerouslySetInnerHTML={{ __html: remark._source.remarks }} />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  _formatTime(timeInSeconds) {
    const secondsInFloat = parseFloat(timeInSeconds)
    const timeInMiliseconds = secondsInFloat * 1000
    const formatted = moment.utc(timeInMiliseconds).format("HH:mm:ss")
    return formatted
  }

}

export default RemarksBox