import React from 'react'

const AppContext = React.createContext({
  showMainMenu: false,
  togleMainMenu: () => {},
  closeMainMenu: () => {},
  movies: [],
  fetchAllMovies: () => {}
})

export default AppContext