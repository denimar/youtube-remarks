import { takeEvery, put, call } from 'redux-saga/effects'
import { FETCH_EMPLOYEE, FETCH_EMPLOYEE_ASYNC } from '../../utils/action-types'

function* fetchEmployeesAsync() {
  const response = yield call(fetch, 'http://localhost:5000/employee')
  const data = yield call([response, response.json])
  yield put({ type: FETCH_EMPLOYEE_ASYNC, payload: data.hits})
}

export function* watchFetchEmployees() {
  yield takeEvery(FETCH_EMPLOYEE, fetchEmployeesAsync)
}