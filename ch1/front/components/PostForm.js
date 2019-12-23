import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import { useSelector } from 'react-redux'

const PostForm = () => {
  const { imagePath } = useSelector(state=> state.post)
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
          {imagePath.map((v) => {
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