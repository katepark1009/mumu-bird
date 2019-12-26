const dummyUser = {
  nickname: 'Kate',
  Post: [],
  Followings: [],
  Followers: [],
}

const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {}
}

export const LOG_IN = 'LOG_IN' //액션 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'
export const LOG_OUT = 'LOG_OUT' 
export const SIGN_UP = 'SIGN_UP' 
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const HELLO_SAGA='HELLO_SAGA'
export const BYE_SAGA='BYE_SAGA'

export const loginAction = { //type: 액션이름, 데이터 함께 넣어줌 //state같은 역할
  type: LOG_IN,
  data: dummyUser
}

export const logoutAction = { //type: 액션이름, 데이터 함께 넣어줌 //state같은 역할
  type: LOG_OUT
}

export const signUpAction = (data) => { 
//action에 넣을 데이터가 동적인 경우 action은 함수로 만들어야 함.
  return {
    type: SIGN_UP,
    data: data
  }
}

export const signUpSuccess = {
  type: SIGN_UP_SUCCESS
}

const reducer = ( state = initialState, action) => { //액션이 들어왔을때 다음 state를 어떻게 바꿔줄지 //setstate같은 역할
  switch( action.type) {
    case LOG_IN: {
      return{
        ...state,
        isLoggedIn: true,
        user: dummyUser
      }
    }
    case LOG_OUT: {
      return{
        ...state,
        isLoggedIn: false,
        user: null
      }
    }
    case SIGN_UP : {
      return{
        ...state,
        signUpData: action.data
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