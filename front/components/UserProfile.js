import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Card, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/user'

const UserProfile = () => {
  const { user } = useSelector(state=> state.user)
  const dispatch = useDispatch()

  const onLogOut = useCallback( ()=> {
    dispatch(logoutAction)
  }, []) // prop으로 자식에게 전달하기 때문에 usecallback으로 감싸줌.
  console.log('user', user)
  return (
    <Card
      actions={[
        <div key="twit">twit<br />{user.Post.length}</div>,
        <div key="following">following<br />{user.Followings.length}</div>,
        <div key="follower">follower<br />{user.Followers.length}</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname[0]}</Avatar>}
        title={user.nickname}
      />
      <Button onClick={onLogOut}>Log Out</Button>
    </Card>
  )
}

UserProfile.propTypes = {
}
export default UserProfile