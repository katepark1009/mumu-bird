export const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: '', // 로그인 실패 사유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 사유
  me: null, // 내 정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  userInfo: null, // 남의 정보
  isEditingNickname: false, // 이름 변경 중
  editNicknameErrorReason: '', // 이름 변경 실패 사유
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' //비동기 액션 이름 -> REQUEST, SUCCESS, FAILURE 세가지 붙으면 리덕스 사가 써야겠구나~
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST' //사용자 정보 불러오기
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST' 
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST' 
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST' //팔로우, 팔로워 목록 불러오기
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS'
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE'

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST' //팔로우
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE'

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST' // 언 팔로우
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS'
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE'

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST' // 팔로워 중에 지우고 싶으면 지우게 
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME' //! 중요, 리듀서 단점때문에 만든 액션 

const reducer = ( state = initialState, action) => { //액션이 들어왔을때 다음 state를 어떻게 바꿔줄지 //setstate같은 역할
  switch( action.type) {
    //----------------로그인 사이클
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: ''
      }
    }
    case LOG_IN_SUCCESS: {
      return{
        ...state,
        isLoggingIn: false,
        //isLoggedIn: true,
        me: action.data,
        isLoading: false
      }
    }
    case LOG_IN_FAILURE: {
      return{
        ...state,
        isLoggingIn: false,
        //isLoggedIn: false,
        me: null,
        logInErrorReason: action.error
      }
    }
    //-----------------로그아웃 사이클

    case LOG_OUT_REQUEST: {
      return{
        ...state,
        isLoggedOut: true,
      }
    }
    case LOG_OUT_SUCCESS: {
      return{
        ...state,
        isLoggedOut: false,
        me: null
      }
    }
    //-----------------sign up 사이클
    case SIGN_UP_REQUEST : {
      return{
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpErrorReason: ''
      }
    }
    case SIGN_UP_SUCCESS : {
      return{
        ...state,
        isSigningUp: false,
        isSignedUp: true
      }
    }
    case SIGN_UP_FAILURE : {
      return{
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error
      }
    }

    //-----------------load user 사이클
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_USER_SUCCESS: {
      if(action.me) {
        return {
          ...state,
          me: action.data,
        };
      }
      return {
        ...state,
        userInfo: action.data
      }
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
      };
    }

    case FOLLOW_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: [{ id: action.data }, ...state.me.Followings],
        },
      };
    }
    case FOLLOW_USER_FAILURE: {
      return {
        ...state,
      };
    }
    case UNFOLLOW_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case UNFOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: state.me.Followings.filter(v => v.id !== action.data),
        },
        followingList: state.followingList.filter(v => v.id !== action.data),
      };
    }
    case UNFOLLOW_USER_FAILURE: {
      return {
        ...state,
      };
    }
    case ADD_POST_TO_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    }

    case LOAD_FOLLOWERS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        followerList: action.data,
      };
    }
    case LOAD_FOLLOWERS_FAILURE: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWINGS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        followingList: action.data,
      };
    }
    case LOAD_FOLLOWINGS_FAILURE: {
      return {
        ...state,
      };
    }
    case REMOVE_FOLLOWER_REQUEST: {
      return {
        ...state,
      };
    }
    case REMOVE_FOLLOWER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followers: state.me.Followers.filter(v => v.id !== action.data),
        },
        followerList: state.followerList.filter(v => v.id !== action.data),
      };
    }
    case REMOVE_FOLLOWER_FAILURE: {
      return {
        ...state,
      };
    }
    case EDIT_NICKNAME_REQUEST: {
      return {
        ...state,
        isEditingNickname: true,
        editNicknameErrorReason: '',
      };
    }
    case EDIT_NICKNAME_SUCCESS: {
      return {
        ...state,
        isEditingNickname: false,
        me: {
          ...state.me,
          nickname: action.data,
        },
      };
    }
    case EDIT_NICKNAME_FAILURE: {
      return {
        ...state,
        isEditingNickname: false,
        editNicknameErrorReason: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

export default reducer