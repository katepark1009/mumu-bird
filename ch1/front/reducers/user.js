const initialState = {
  isLoggedIn: false,
  user: {}
}

const LOG_IN = 'LOG_IN' //액션 이름
const LOG_OUT = 'LOG_OUT' //액션 이름


const loginAction = { //type: 액션이름, 데이터 함께 넣어줌 //state같은 역할
  type: LOG_IN,
  data: {
    nickname: 'kate'
  }
}

const reducer = ( state = initialState, action) => { //액션이 들어왔을때 다음 state를 어떻게 바꿔줄지 //setstate같은 역할
  switch( action.type) {
    case LOG_IN: {
      return{
        ...state,
        isLoggedIn: true,
        user: action.data
      }
    }
    case LOG_OUT: {
      return{
        ...state,
        isLoggedIn: false,
        user: null
      }
    }
    default: {
      return{
        ...state
      }
    }
  }
}

export default reducer