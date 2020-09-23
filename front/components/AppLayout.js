import React, { useEffect } from 'react'
import { Menu, Input, Avatar, Row, Col, Card } from 'antd'
import LoginForm from './LoginForm'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Router from 'next/router';
import { useSelector } from 'react-redux'
import UserProfile from '../containers/UserProfile'

const AppLayout = ({ children }) => {
  const { me } = useSelector(state=> state.user)

  const onSearch = (value) => {
    Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
  };

  return (
    <div>
      <Menu mode="horizontal" style={{marginBottom: '10px'}}>
        <Menu.Item key="home"><Link href='/'><a>MumuBird</a></Link></Menu.Item>
        {/* 사용자가 자주 다니는 페이지를 prefetch하면 넥스트가 미리 가져옴 */}
        <Menu.Item key="profile"><Link href='/profile' prefetch><a>profile</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} onSearch={onSearch}/>
        </Menu.Item>
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me
            ? <UserProfile />
            : <LoginForm />
          }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={6} md={6}>
          <a href='https://github.com/katepark1009/mumu-bird' target='_blank'>Made by Kate</a>
        </Col>
      </Row>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout