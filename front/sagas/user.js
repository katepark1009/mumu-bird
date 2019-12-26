import { all, delay, put, take, takeLatest, takeEvery } from 'redux-saga/effects'
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE, HELLO_SAGA, BYE_SAGA } from '../reducers/user'

function loginAPI(){ //서버에 요청을 보내는 부분

}

function* login(){
  try{
    yield delay(100)  //서버에 요청
    yield put({ //put은 리덕스의 dispatch와 동일,
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
  while(true){ //왠만하면 while(true)로 감싸는데, 로그인 같은 경우도 로그아웃 후 재로그인 시에도 게속 사가 작동할 수 있도록
    yield take(LOG_IN) //로그인 액션이 들어오면
    //yiedl delay(2000) //2초 뒤에 다음 부분이 실행되도록 컨드롤 하는 것도 가능 
    yield put({ //put은 리덕스의 dispatch와 동일, 자동으로 실행
      type: LOG_IN_SUCCESS
    })
  }
}

function* watchHello(){ //while(true) 와 같은 역할, 제너레이터 함수 넣어주기.
  yield takeLatest(HELLO_SAGA, function* (){
    yield delay(1000)
    yield put({
      type: 'BYE_SAGA'
    })
  })
}


// function* watchHello(){ //while(true) 와 같은 역할, 제너레이터 함수 넣어주기.
//   yield takeEvery(HELLO_SAGA, function* (){
//     yield put({
//       type: 'BYE_SAGA'
//     })
//   })
// }

// function* watchHello(){
//   while(true){
//     yield take(HELLO_SAGA)
//     console.log(1)
//     console.log(2)
//     console.log(3)
//     console.log(4)
//   }
// }

function* watchSignUp(){

}

export default function* userSaga(){
  yield all([
    watchLogin(),
    watchSignUp(),
    watchHello()
  ])
}