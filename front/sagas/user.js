import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import {
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3065/api'

// login cycle

function loginAPI(loginData){ //서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData)
}

function* login(action){
  try{
    //yield fork(logger) 로그인 기록하는 logger라는 10초 걸리는 가상 함수가 있다고 할때, 기다리지 않고 넘어갈 수 있도록. 
    const result = yield call(loginAPI, action.data)  //서버에 요청, call은 요청이 끝나야지 다음으로 넘어감 -> 에러시 catch로 넘어감.
    //axios 응답에서 받은 데이터를 result안에 저장
    
    yield put({ //put은 리덕스의 dispatch와 동일,
      type: LOG_IN_SUCCESS, 
      data: result.data //사용자 정보 들어있는 부분
    })
  } catch(e) { //loginAPI 실패
    console.error(e)
    yield put({ 
      type: LOG_IN_FAILURE 
    })
  }
}

function* watchLogin(){
  yield takeEvery(LOG_IN_REQUEST, login) //로그인 액션이 들어오면
}


// sign up cycle

function signUpAPI(signUpData){ //서버에 요청을 보내는 부분
  return axios.post('/user', signUpData)
}

function* signUp(action){ //action에 id, pass, nick이 들어있는 거임.
  try{
    //yield fork(logger) 로그인 기록하는 logger라는 10초 걸리는 가상 함수가 있다고 할때, 기다리지 않고 넘어갈 수 있도록. 
    //yield call(loginAPI)  //서버에 요청, call은 요청이 끝나야지 다음으로 넘어감 -> 에러시 catch로 넘어감.
    yield call(signUpAPI, action.data)
    yield put({ //put은 리덕스의 dispatch와 동일,
      type: SIGN_UP_SUCCESS
    })
  } catch(e) { //loginAPI 실패
    console.error(e)
    yield put({ 
      type: SIGN_UP_FAILURE,
      error: e 
    })
  }
}

function* watchSignUp(){
  yield takeEvery(SIGN_UP_REQUEST, signUp) //로그인 액션이 들어오면
}

export default function* userSaga(){
  yield all([ //all은 동시에 실행함
    fork(watchLogin),
    fork(watchSignUp), //순서가 상관 없기때문에 fork사용하는 것임.
  ])
}

// call/fork 둘다 함수 실행하는 역할
// 
// fork : 비동기
// call : 동기(순서 지켜서 실행)

// function* watchHello(){ //while(true) 와 같은 역할, 제너레이터 함수 넣어주기.
//   yield takeEvery(HELLO_SAGA, function* (){
//     yield put({
//       type: 'BYE_SAGA'
//     })
//   })
// }
// ! 위 아래 같음. 취향차이 :)
// function* watchHello(){
//   while(true){
//     yield take(HELLO_SAGA)
//     console.log(1)
//     console.log(2)
//     console.log(3)
//     console.log(4)
//   }
// }
