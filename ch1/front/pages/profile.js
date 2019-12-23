import React from 'react'
import { Form, Input, Button, List, Card, Icon } from 'antd'
import NicknameEditForm from '../components/NicknameEditForm'

const Profile = () => {
  return (
    <div>
      <NicknameEditForm />
      <List 
        style={{ marginBottom: '20px'}}
        grid={{ gutter: 4, xs: 2, md: 3}}
        size='small'
        header={<div>following</div>}
        loadMore={<Button style={{width: '100%'}}>More</Button>}
        bordered
        dataSource={['kate', 'mumu', 'llama']}
        renderItem={ item => (
          <List.Item style={{marginTop: '20px'}}>
            <Card actions={[<Icon type='stop' />]}><Card.Meta description={item} /></Card>
          </List.Item>
        )}
      />
      <List 
        style={{ marginBottom: '20px'}}
        grid={{ gutter: 4, xs: 2, md: 3}}
        size='small'
        header={<div>followers</div>}
        loadMore={<Button style={{width: '100%'}}>More</Button>}
        bordered
        dataSource={['edmund', 'mumu']}
        renderItem={ item => (
          <List.Item style={{marginTop: '20px'}}>
            <Card actions={[<Icon type='stop' />]}><Card.Meta description={item} /></Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Profile