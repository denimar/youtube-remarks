import React from 'react'
import './TranscriptBox.scss'
import moment from 'moment'

class TranscriptBox extends React.Component {

  constructor() {
    super()
    this.state = {
      selectedIndex: -1
    }
  }

  transcriptItemClick(transcriptItem, selectedIndex) {
    const selectedTranscriptItemElems = document.querySelectorAll('.transcriptbox-container .transcript-items .transcript-item')
    selectedTranscriptItemElems.forEach(itemElem => itemElem.classList.remove('selected'))

    const selectedTranscriptItemElem = document.querySelector(`.transcriptbox-container .transcript-items .transcript-item[index="${selectedIndex}"]`)
    selectedTranscriptItemElem.classList.add('selected')

    const timeObj = transcriptItem['$']
    const currentTime = parseFloat(timeObj.start)
    this.props.playerElm.context.media.seekTo(currentTime)
  }

  selectTranscriptItem(selectedIndex) {
    if (selectedIndex !== this.state.selectedIndex) {
      this.setState({ selectedIndex })

      const selectedTranscriptItemElem = document.querySelector(`.transcriptbox-container .transcript-items .transcript-item[index="${selectedIndex}"]`)
      if (selectedTranscriptItemElem) {
        this._scrollIntoViewCentralizing(selectedTranscriptItemElem)
      }
    }
  }

  render() {
    return (
      <div className="transcriptbox-container">
        <div className="transcriptbox-header"><span className="transcriptbox-header-title">Transcript</span></div>
        <div className="transcriptbox-body">
          <div className="transcript-items">
            {this._renderTranscripts(this.props.movie)}
          </div>
        </div>
      </div>
    )
  }

  _scrollIntoViewCentralizing(selectedTranscriptItemElem) {
    selectedTranscriptItemElem.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    });
  }

  _renderTranscripts(movieObj) {
    const _self = this
    if (movieObj && movieObj.transcript) {
      return movieObj.transcript.map((transcriptItem, index) => {
        const text = transcriptItem['_']
        if (text) {
          const timeObj = transcriptItem['$']
          return (
            <div
              key={index}
              index={index}
              className={'transcript-item' + (index === _self.state.selectedIndex ? ' selected' : '')}
              onClick={_self.transcriptItemClick.bind(_self, transcriptItem, index)}
            >
              <div className="transcript-item-field time">{_self._formatTime(timeObj.start)}</div>
              <div className="transcript-item-field text" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
          )
        } else {
          return null
        }
      })
    }
    return null
  }

  _formatTime(timeInSeconds) {
    const secondsInFloat = parseFloat(timeInSeconds)
    const timeInMiliseconds = secondsInFloat * 1000
    const formatted = moment.utc(timeInMiliseconds).format("HH:mm:ss")
    return formatted
  }

}

export default TranscriptBox