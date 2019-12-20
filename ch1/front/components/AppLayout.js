import React, { Children } from 'react'
import { Menu, Input, Button } from 'antd'
import Link from 'next/link'

const AppLayout = ({children}) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home"><Link href='/'><a>MumuBird</a></Link></Menu.Item>
        <Menu.Item key="profile"><Link href='/profile'><a>profile</a></Link></Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{verticalAlign:'middle'}}/>
        </Menu.Item>
      </Menu>
      <Link href='/signup'><Button>Sign in</Button></Link>
      {children}
    </div>
  )
}

export default AppLayout