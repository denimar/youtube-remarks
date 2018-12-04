import React, { Component } from 'react'
import '../../styles/_core.scss'
import './App.scss'
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'
import AppContext from './AppContext'
import MovieService from '../../routes/movie/MovieService'

class App extends Component {

  constructor() {
    super()
    this.state = {
      showMainMenu: false,
      togleMainMenu: () => {
        this.setState({ showMainMenu: !this.state.showMainMenu })
      },
      closeMainMenu: () => {
        this.setState({ showMainMenu: false })
      },
      movies: [],
      fetchAllMovies: async () => {
        const movies = await MovieService.fetchAllMovies()
        this.setState({ movies: movies.data })
        this.forceUpdate()
      }
    }
  }

  async componentDidMount() {
    await this.state.fetchAllMovies()
  }

  appOnMouseDown(event) {
    if (!this._clickedInsideMainMenu(event.target)) {
      this.state.closeMainMenu()
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="app-container" onMouseDown={this.appOnMouseDown.bind(this)}>
          <Header />
          <Body />
          <Footer />
        </div>
      </AppContext.Provider>
    )
  }

  _clickedInsideMainMenu(targetElement) {
    let parentElement = targetElement.parentElement
    while (parentElement) {
      if (parentElement.classList.contains('main-menu-container')) {
        return true;
      }
      parentElement = parentElement.parentElement
    }
    return false
  }

}

export default App