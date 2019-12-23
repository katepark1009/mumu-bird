import { all, fork } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user'

function loginAPI(){ //서버에 요청을 보내는 부분

}

function* login(){
  try{
    yield call(loginAPI)  //서버에 요청
    yield put({ //put은 dispatch와 동일,
      type: LOG_IN_SUCCESS
    })
  } catch(e) { //loginAPI 실패
    console.error(e)
    yield put({ 
      type: LOG_IN_FAILURE
    })
  }
}

function* watchLogin(){
  yield takeLatest(LOG_IN, login) //로그인 액션이 들어오면
}

export default function* userSaga(){
  yield all([
    fork(watchLogin)
  ])
}