import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import { Avatar, Card } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const WhiteText = styled.div`
  color: white;
  font-size: .7rem;
`
const NumberText = styled.div`
  color: #23abe2;
  font-weight: 800;
  font-size: 1.1rem;
`
const Profile = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
`

const UserProfile = () => {
  const { me } = useSelector(state=> state.user)
  return (
    <Card
      style={{ marginBottom: '20px' }}
      actions={[
        <Link href="/profile" key="twit">
          <a>
            <NumberText>{me.Posts.length}</NumberText>
            <WhiteText>TWEETS</WhiteText>
          </a>
        </Link>,
        <Link href="/profile" key="following">
          <a>
            <NumberText>{me.Followings.length}</NumberText>
            <WhiteText>{me.Followings.length > 1 ? 'FOLLOWINGS' : 'FOLLOWING'}</WhiteText>
          </a>
        </Link>,
        <Link href="/profile" key="follower">
          <a>
            <NumberText>{me.Followers.length}</NumberText>
            <WhiteText>{me.Followers.length > 1 ? 'FOLLOWERS' : 'FOLLOWER'}</WhiteText>
          </a>
        </Link>,
      ]}
    >
      <Card.Meta
        style={{ height: '80px', display: 'flex', alignItems: 'center' }}
        avatar={<Profile src={'/profile-placeholder.png'} width={50} />}
        title={<div style={{ marginRight: '20px' }}>{me.nickname}</div>}
        description="This is the description"
      />
    </Card>
  )
}

UserProfile.propTypes = {
}
export default UserProfile