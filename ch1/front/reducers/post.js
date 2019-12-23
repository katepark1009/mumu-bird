const initialState = {
  mainPosts: []
}

const ADD_POST = 'ADD_POST' //액션 이름
const ADD_DUMMY = 'ADD_DUMMY' //액션 이름


const addPost = { //type: 액션이름, 데이터 함께 넣어줌 //state같은 역할
  type: ADD_POST,
}
const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: 'Hello',
    UserId: 1,
    User: {
      nickname: 'kate'
    }
  }
}

const reducer = ( state = initialState, action) => { //액션이 들어왔을때 다음 state를 어떻게 바꿔줄지 //setstate같은 역할
  switch( action.type) {
    case ADD_POST: {
      return{
        ...state
      }
    }
    case ADD_DUMMY: {
      return{
        ...state,
        mainPosts: [action.data, ...state.mainPosts]
      }
    }
    default: {
      return{
        ...state
      } //옛날 state를 새로 객체만 만들어줘서 리턴하는 부분.
    }
  }
}

export default reducer