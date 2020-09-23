import React, { useEffect, useCallback, useRef } from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../containers/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
  // const { user } = useSelector(state=> state.user.user) //전체 state에서 user만 가져오는 것, user 안에는  `isLoggedIn: false, user: {}` 가 있음. 전체 스테이트에서 분해해서 사용가능
  const { me } = useSelector(state=> state.user) //잘게 쪼개는게 좋음. 리랜더링 되는거 방지
  const { mainPosts, hasMorePost } = useSelector(state=> state.post)
  const dispatch = useDispatch()
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight)
    // window.scrollY = 현재위치(윈도우 상 제일윗부분)
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      console.log('more posts loading')
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
          countRef.current.push(lastId);
        }
      }
    }
  }, [hasMorePost, mainPosts.length])


  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length]);
  // useEffect(()=> {
  //   dispatch({
  //     type: LOAD_MAIN_POSTS_REQUEST,
  //   });
  // }, []) 
  // [] 패스하면 componentdidmount랑 똑같음. 컴포넌트가 첫번째 랜더링 될때, 이 액션이 디스패치 됨.
  return (
    <div>
      {/* {user ? <div>로그인 했습니다. {user.nickname}</div> : <div>로그아웃 했습니다.</div>} */}
      {me && <PostForm />}
      {mainPosts.map((c, i)=>{
        return(
          <PostCard key={c.id} post={c} />
        )
      })}
    </div>
  )
}

Home.getInitialProps = async (context) => {
  console.log(Object.keys(context)); // ["pathname", "query", "asPath", "AppTree", "store", "isServer"]
  context.store.dispatch({ // store 리덕스 -> dispatch 액션 실행 가능
    type: LOAD_MAIN_POSTS_REQUEST,
  });
};

export default Home