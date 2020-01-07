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

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' //비동기 액션 이름 -> REQUEST, SUCCESS, FAILURE 세가지 붙으면 리덕스 사가 써야겠구나~
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST' 
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST' 
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const HELLO_SAGA='HELLO_SAGA' //동기 액션 이름 -> 리덕스만으로 처리가능~
export const BYE_SAGA='BYE_SAGA'

export const loginAction = { //type: 액션이름, 데이터 함께 넣어줌 //state같은 역할
  type: LOG_IN_REQUEST,
  data: dummyUser
}

export const logoutAction = { //type: 액션이름, 데이터 함께 넣어줌 //state같은 역할
  type: LOG_OUT_REQUEST
}

export const signUpAction = data => ( 
//action에 넣을 데이터가 동적인 경우 action은 함수로 만들어야 함.
{
    type: SIGN_UP_REQUEST,
    data: data
})

export const signUpSuccess = {
  type: SIGN_UP_SUCCESS
}

const reducer = ( state = initialState, action) => { //액션이 들어왔을때 다음 state를 어떻게 바꿔줄지 //setstate같은 역할
  switch( action.type) {
    case LOG_IN_REQUEST: {
      return{
        ...state,
        loginData: action.data,
        isLoading: true
      }
    }
    case LOG_IN_SUCCESS: {
      return{
        ...state,
        isLoggedIn: true,
        user: dummyUser,
        isLoading: false
      }
    }
    case LOG_OUT_REQUEST: {
      return{
        ...state,
        isLoggedIn: false,
        user: null
      }
    }
    case SIGN_UP_REQUEST : {
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