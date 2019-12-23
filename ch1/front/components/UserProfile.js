import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Card } from 'antd'

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

const UserProfile = () => {
  return (
    <Card
      actions={[
        <div key="twit">twit<br />{dummy.Post.length}</div>,
        <div key="following">following<br />{dummy.Followings.length}</div>,
        <div key="follower">follower<br />{dummy.Followers.length}</div>
      ]}
    >
      <Card.Meta
        title={dummy.nickname}
        avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
      />
    </Card>
  )
}

UserProfile.propTypes = {
}
export default UserProfile