import { all, fork, delay, takeLatest, put } from 'redux-saga/effects'
import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from '../../front/reducers/post'

function addPostAPI(){

}

function addCommentAPI(){

}

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

function* addComment(action){ //request에 대한 action임
  try {
    yield delay(2000)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId //PostCard.js에서 dispatch한 정보를 가져올 수 있음.
      }
    })
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e
    })
  }
}


function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST, addPost) //게시글 여러번 눌러도 한번만 작성되어야 하기때문에 takeLatest사용
}

function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga(){
  yield all([
    fork(watchAddPost),
    fork(watchAddComment)
  ])
}