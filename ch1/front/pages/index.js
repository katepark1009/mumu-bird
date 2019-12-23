import React from 'react'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

const dummy = {
  isLoggedIn: true,
  imagePath: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: 'Kate',
    },
    content: 'fisrt post test',
    img: 'https://storep-phinf.pstatic.net/linesweet_01/original_8.gif?type=pa50_50'
  }],
}

const Home = () => {
  return (
    <div>
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((c)=>{
        return(
          <PostCard key={c} post={c} />
        )
      })}
    </div>
  )
}

export default Home