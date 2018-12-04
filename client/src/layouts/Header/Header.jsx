import React from 'react'
import './Header.scss'
import Icon from 'react-icons-kit'
import { bars } from 'react-icons-kit/fa/bars'
import AppContext from '../App/AppContext'

class Header extends React.Component {

  render() {
    return (
      <div className="header-container">
        <AppContext.Consumer>
          {context => (
            <div><Icon className={'main-menu-button' + (context.showMainMenu ? ' showing' : '')} icon={bars} size={22} onClick={context.togleMainMenu} /></div>
          )}
        </AppContext.Consumer>
      </div>
    )
  }

}

export default Header