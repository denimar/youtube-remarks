import { all } from 'redux-saga/effects'
import { watchMovieActions } from '../routes/movie/MovieSaga'

export default function* rootSaga() {
  yield all([
    watchMovieActions()
  ])
}