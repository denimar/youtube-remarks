import React, { Component } from 'react'
import { Media, Player } from 'react-media-player'

class MediaPlayer extends Component {

  componentDidMount() {
    const _self = this
    setTimeout(() => {
      //_self.mediaElem.setState({ currentTime: 30000 })
      _self.player.context.media.seekTo(58)
    }, 2000)
  }

  render() {
    //const { Player, keyboardControls } = this.props
    return (
      <Media>
        {mediaProps => (
          <div
            className="media"
            onKeyDown={keyboardControls.bind(null, mediaProps)}
          >
            <Player ref={elem => this.player = elem} src="https://www.youtube.com/watch?v=8R3cNRFPVxc" className="media-player" />
          </div>
        )}
      </Media>
    )
  }
}

export default MediaPlayer