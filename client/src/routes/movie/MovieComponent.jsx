import React from 'react'
import './MovieComponent.scss'
import { Media, Player } from 'react-media-player'
import MainMenu from './components/MainMenu'
import TranscriptBox from './components/TranscriptBox'
import RemarksBox from './components/RemarksBox'
import AppContext from '../../layouts/App/AppContext'
import moviesBackgroundPng from './movies-background.png'


class MovieComponent extends React.Component {

  constructor() {
    super()
    this.state = { movieId: -1, currentMovie: null, remarks: [] }
  }

  onPlayerProgress(movieObj) {
    this._selectTranscriptItem(this.transcriptBox, this.player.context.media.currentTime, movieObj)
  }

  selectCurrentMovieFn(movieId, currentMovie, remarks) {
    this.setState({ movieId, currentMovie, remarks })
  }

  render() {
    const movieUrl = this.state.currentMovie ? `https://www.youtube.com/watch?v=${this.state.currentMovie.movieId}` : undefined
    return (
      <AppContext.Consumer>
        {
          context => (
            <div className="movie-container">
              <MainMenu movies={context.movies} selectCurrentMovieFn={this.selectCurrentMovieFn.bind(this)} />
              {
                this.state.currentMovie ? (
                  <React.Fragment>
                    <Media>
                      <div className="media">
                        <div className="media-player">
                          <Player
                            autoPlay={'true'}
                            ref={elem => this.player = elem}
                            src={movieUrl}
                            onProgress={this.onPlayerProgress.bind(this, this.state.currentMovie)}
                          />
                        </div>
                      </div>
                    </Media>
                    <TranscriptBox ref={elem => this.transcriptBox = elem} movie={this.state.currentMovie} playerElm={this.player} />
                    <RemarksBox movieId={this.state.movieId} remarks={this.state.remarks} playerElm={this.player} />
                  </React.Fragment>
                ) : (<div className="movie-background"><img src={moviesBackgroundPng} /></div>)
              }
            </div>
          )
        }
      </AppContext.Consumer>
    )
  }

  _selectTranscriptItem(transcriptBox, currentTime, movieObj) {
    const transcript = movieObj.transcript || []
    transcript.forEach((transcriptItem, index) => {
      const timeObj = transcriptItem['$']
      const startTime = parseFloat(timeObj.start)
      const endTime = startTime + parseFloat(timeObj.dur)
      if (currentTime > startTime && currentTime < endTime) {
        return transcriptBox.selectTranscriptItem(index)
      }
    })
  }

}

export default MovieComponent