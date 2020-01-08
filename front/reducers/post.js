const initialState = {
  mainPosts: [{
    User: {
      id: 1,
      nickname: 'Kate',
    },
    content: 'fisrt post test',
    img: 'https://storep-phinf.pstatic.net/linesweet_01/original_8.gif?type=pa50_50'
  }], // 화면에 보일 포스트들
  imagePath: [], //미리보기 이미지 경로
  addPostErrorReason: false, //포스트 업로드 실패 사유
  isAddingPost: false, //포스트 업로드 중
  postAdded: false, //포스트 업로드 성공
}

const dummyPost = {
  User: {
    id: 1,
    nickname: 'Kate',
  },
  content: '더미 포스트 입니다',
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST' //포스트 업로드 
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' 
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE' 

export const LOAD_MAIN_POST_REQUEST = 'LOAD_MAIN_POST_REQUEST' //메인포스트 로딩
export const LOAD_MAIN_POST_SUCCESS = 'LOAD_MAIN_POST_SUCCESS' //메인포스트 로딩
export const LOAD_MAIN_POST_FAILURE = 'LOAD_MAIN_POST_FAILURE' //메인포스트 로딩

export const LOAD_HASHTAG_POST_REQUEST = 'LOAD_HASHTAG_POST_REQUEST' //해쉬태그 
export const LOAD_HASHTAG_POST_SUCCESS = 'LOAD_HASHTAG_POST_SUCCESS' //해쉬태그 
export const LOAD_HASHTAG_POST_FAILURE = 'LOAD_HASHTAG_POST_FAILURE' //해쉬태그 

export const LOAD_USER_POST_REQUEST = 'LOAD_USER_POST_REQUEST' //포스트 로딩
export const LOAD_USER_POST_SUCCESS = 'LOAD_USER_POST_SUCCESS' //포스트 로딩
export const LOAD_USER_POST_FAILURE = 'LOAD_USER_POST_FAILURE' //포스트 로딩

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST' //이미지 업로드
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS' //이미지 업로드
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE' //이미지 업로드

export const REMOVE_IMAGE = 'REMOVE_IMAGE' //이미지 업로드 취소, 동기적으로 없애도 되서 비동기 안씀

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST' //하트 누르는 액션
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS' //하트 누르는 액션
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE' //하트 누르는 액션

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST' //하트 누르는 거 취소하는 액션
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS' //하트 누르는 거 취소하는 액션
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE' //하트 누르는 거 취소하는 액션

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST' //댓글 남기는 액션
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS' //댓글 남기는 액션
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE' //댓글 남기는 액션

export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST' //댓글 불러오는 액션
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS' //댓글 불러오는 액션
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE' //댓글 불러오는 액션

export const RETWEET_REQUEST = 'RETWEET_REQUEST' //리트윗 액션
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS' //리트윗 액션
export const RETWEET_FAILURE = 'RETWEET_FAILURE' //리트윗 액션

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST' //포스트 제어하는 액션
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS' //포스트 제어하는 액션
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE' //포스트 제어하는 액션

//포스트 수정..숙제?

export const ADD_DUMMY = 'ADD_DUMMY' //액션 이름

const addPost = { //type: 액션이름, 데이터 함께 넣어줌 //state같은 역할
  type: ADD_POST_REQUEST,
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
    case ADD_POST_REQUEST: {
      return{
        ...state,
        isAddingPost: true,
        addPostErrorReason: '',
        postAdded: false
      }
    }
    case ADD_POST_SUCCESS: {
      return{
        ...state,
        isAddingPost: false,
        mainPosts: [dummyPost, ...state.mainPosts], // 게시글 작성 성공시, 기존포스트 앞에 새 포스트가 추가됨.
        postAdded: true
      }
    }
    case ADD_POST_FAILURE: {
      return{
        ...state,
        isAddingPost: false,
        addPostErrorReason: action.error
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