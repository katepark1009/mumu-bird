import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'

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

const PostForm = () => {
  return (
    <div>
      <Form encType='multipark/form-data' style={{ margin: '10px 0 20px' }}>
        <Input.TextArea maxLength={140} placeholder='Tell me something...' />
        <div>
          <Input type='file' multiple hidden />
          <Button>Upload Image</Button>
          <Button type='primary' style={{ float: 'right' }} htmlType='submit'>Submit</Button>
        </div>
        <div>
          {dummy.imagePath.map((v, i) => {
            return (
              <div key={v} style={{ display: 'inline-block' }}>
                <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v} />
                <Button>Remove</Button>
              </div>
            )
          })}
        </div>
      </Form>
    </div>
  )
}

PostForm.propTypes = {
}
export default PostForm