import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_POST_REQUEST } from '../reducers/post'

const PostForm = () => {
  const dispatch = useDispatch()
  const [ text, setText ] = useState('')
  const { imagePath, isAddingPost, postAdded } = useSelector(state=> state.post)

  useEffect(()=>{
    setText('')
  },[postAdded === true]) //postAdded가 true인 순간에 text값을 ''로 

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        text
      }
    })
  },[])
  const onChangeText = useCallback((e)=>{
    setText(e.target.value)
  }, []) // prop으로 자식에게 전달하기 때문에 usecallback으로 감싸줌.
  return (
    <div>
      <Form encType='multipark/form-data' style={{ margin: '10px 0 20px' }} onSubmit={onSubmit}>
        <Input.TextArea maxLength={140} placeholder='Tell me something...' value={text} onChange={onChangeText} />
        <div>
          <Input type='file' multiple hidden />
          <Button>Upload Image</Button>
          <Button type='primary' style={{ float: 'right' }} htmlType='submit' loading={isAddingPost}>Submit</Button>
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