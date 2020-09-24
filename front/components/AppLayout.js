import React, { useCallback } from 'react'
import { Menu, Input, Row, Col, Icon } from 'antd'
import LoginForm from '../containers/LoginForm'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import UserProfile from '../containers/UserProfile'
import styled from 'styled-components'
import { LOG_OUT_REQUEST } from '../reducers/user'
import TopNav from './Nav'

const Logo = styled.div`
  text-align: left;
  margin: 20px 20px;
  display: flex;
  h1 {
    padding-top: 4px;
    padding-left: 15px;
    margin: 0;
  }
`
const PostContainer = styled.div`
  border-left: 1px solid #d9dbde;
  padding: 20px 40px;
`
const SideBar = styled.div`
  height: 100%;
  a {
    text-align: center;
  }
`
const ProfileContainer = styled.div`
  margin: 40px 20px 60px 20px;
  height: 150px;
  ul {
    background-color: #3b4448;
    li {
      border: none;
    }
  }
`

const AppLayout = ({ children }) => {
  const { me } = useSelector(state=> state.user)
  const dispatch = useDispatch()

  const onLogOut = useCallback( ()=> {
    dispatch({
      type: LOG_OUT_REQUEST
    })
    Router.push('/') 
  }, []) // prop으로 자식에게 전달하기 때문에 usecallback으로 감싸줌.

  return (
    <div>
      <TopNav logo={<img src='http://localhost:3060/logo.png' width={50} alt='mumubird'/>} title={<h1>MUMUBIRD</h1>}/>
      <Row>
        <Col xs={0} sm={0} md={0} lg={2}>
        </Col>
        <Col xs={24} md={6} lg={4}>
          <SideBar>
            <ProfileContainer>
              {me
                ? <UserProfile />
                : <LoginForm />
              }
            </ProfileContainer>
            <Menu mode="vertical" style={{marginBottom: '10px', textAlign: 'center'}}>
              <Menu.Item key="home"><Link href='/'><a><Icon type="home" />Home</a></Link></Menu.Item>
              <Menu.Item key="home"><Link href='/about'><a><Icon type="appstore" />About</a></Link></Menu.Item>
              {/* 사용자가 자주 다니는 페이지를 prefetch하면 넥스트가 미리 가져옴 */}
              {me && <Menu.Item key="profile"><Link href='/profile' prefetch><a><Icon type="user" />Profile</a></Link></Menu.Item>}
              {me && <Menu.Item key="logout"><span onClick={onLogOut}><Icon type="logout" />Logout</span></Menu.Item>}
            </Menu>
            
          </SideBar>
        </Col>
        <Col xs={24} md={12}>
          <PostContainer>
            {children}
          </PostContainer>
        </Col>
        <Col xs={0} md={6}>
          <div style={{ textAlign: 'right', marginTop: '20px', marginRight: '20px' }}>
            <a href='https://github.com/katepark1009/mumu-bird' target='_blank'>Made with 💙 by Kate</a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout