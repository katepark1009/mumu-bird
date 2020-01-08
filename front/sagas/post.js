import { all, fork, delay, takeLatest, put } from 'redux-saga/effects'
import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS } from '../../front/reducers/post'

function* addPost(){
  try {
    yield delay(2000)
    yield put({
      type: ADD_POST_SUCCESS
    })
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e
    })
  }
}

function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST, addPost) //게시글 여러번 눌러도 한번만 작성되어야 하기때문에 takeLatest사용
}
export default function* postSaga(){
  yield all([
    fork(watchAddPost)
  ])
}