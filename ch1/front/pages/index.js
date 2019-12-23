import React, { useEffect } from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, logoutAction } from '../reducers/user'

const Home = () => {
  const dispatch = useDispatch()
  // const { user } = useSelector(state=> state.user.user) //전체 state에서 user만 가져오는 것, user 안에는  `isLoggedIn: false, user: {}` 가 있음. 전체 스테이트에서 분해해서 사용가능
  const { isLoggedIn } = useSelector(state=> state.user) //잘게 쪼개는게 좋음. 리랜더링 되는거 방지
  const { mainPosts } = useSelector(state=> state.post)
  console.log('isLoggedIn', isLoggedIn)
  useEffect(()=> {
    //dispatch(loginAction)
    //dispatch(logoutAction)
  }, []) // [] 패스하면 componentdidmount랑 똑같음. 컴포넌트가 첫번째 랜더링 될때, 이 액션이 디스패치 됨.
  return (
    <div>
      {/* {user ? <div>로그인 했습니다. {user.nickname}</div> : <div>로그아웃 했습니다.</div>} */}
      {isLoggedIn && <PostForm />}
      {mainPosts.map((c)=>{
        return(
          <PostCard key={c} post={c} />
        )
      })}
    </div>
  )
}

export default Home