import React from 'react'
import './Body.scss'
import HomeComponent from '../../routes/home'
import TextComponent from '../../routes/text'
import MovieComponent from '../../routes/movie/MovieComponent'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class Body extends React.Component {

  render() {
    return (
      <div className="body-container">
        <Router>
          <React.Fragment>
            <Route exact path="/" component={MovieComponent} />
            <Route exact path="/texts" component={TextComponent} />
            <Route exact path="/movies" component={MovieComponent} />
          </React.Fragment>
        </Router>
      </div>
    )
  }

}

export default Body