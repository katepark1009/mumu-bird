import React, { useEffect } from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../reducers/user'
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post'

const Home = () => {
  const dispatch = useDispatch()
  // const { user } = useSelector(state=> state.user.user) //전체 state에서 user만 가져오는 것, user 안에는  `isLoggedIn: false, user: {}` 가 있음. 전체 스테이트에서 분해해서 사용가능
  const { me } = useSelector(state=> state.user) //잘게 쪼개는게 좋음. 리랜더링 되는거 방지
  const { mainPosts } = useSelector(state=> state.post)

  useEffect(()=> {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
    })

  }, []) // [] 패스하면 componentdidmount랑 똑같음. 컴포넌트가 첫번째 랜더링 될때, 이 액션이 디스패치 됨.
  return (
    <div>
      {/* {user ? <div>로그인 했습니다. {user.nickname}</div> : <div>로그아웃 했습니다.</div>} */}
      {me && <PostForm />}
      {mainPosts.map((c, i)=>{
        return(
          <PostCard key={i} post={c} />
        )
      })}
    </div>
  )
}

export default Home