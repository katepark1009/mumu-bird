import React from 'react'
import { Menu, Input, Avatar, Row, Col, Card } from 'antd'
import LoginForm from './LoginForm'
import Link from 'next/link'
import PropTypes from 'prop-types'
import UserProfile from './UserProfile'
import { useSelector } from 'react-redux'

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector(state=> state.user)
  return (
    <div>
      <Menu mode="horizontal" style={{marginBottom: '10px'}}>
        <Menu.Item key="home"><Link href='/'><a>MumuBird</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href='/profile'><a>profile</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item>
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn
            ? <UserProfile />
            : <LoginForm />
          }
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
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