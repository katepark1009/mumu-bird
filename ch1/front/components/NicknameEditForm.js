import React from 'react'
import { Form, Input, Button } from 'antd'

const NicknameEditForm = () => {
  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input addonBefore="nickname" />
      <Button type='primary'>Edit</Button>
    </Form>
  )
}

export default NicknameEditForm