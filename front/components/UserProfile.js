import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Card, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { LOG_OUT_REQUEST } from '../reducers/user'

const UserProfile = () => {
  const { me } = useSelector(state=> state.user)
  const dispatch = useDispatch()

  const onLogOut = useCallback( ()=> {
    dispatch({
      type: LOG_OUT_REQUEST
    })
  }, []) // prop으로 자식에게 전달하기 때문에 usecallback으로 감싸줌.
  return (
    <Card
      actions={[
        <div key="twit">twit<br />{me.Posts.length}</div>,
        <div key="following">following<br />{me.Followings.length}</div>,
        <div key="follower">follower<br />{me.Followers.length}</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogOut}>Log Out</Button>
    </Card>
  )
}

UserProfile.propTypes = {
}
export default UserProfile