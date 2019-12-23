import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import { useInput } from '../components/customHook/hooks'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/user'

const LoginForm = () => {
  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput('')
  const dispatch = useDispatch()
  const onSubmit = useCallback((e) => { 
    e.preventDefault()
    console.log(
      {id, password}
    )
    dispatch(loginAction)
  }, [id, password])
  return (
    <div>
      <Form onSubmit={onSubmit} style={{padding: '10px'}}>
        <div>
          <label htmlFor='user-id'>ID</label>
          <br />
          <Input name='user-id' value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor='user-password'>Password</label>
          <br />
          <Input name='user-password' type='password' value={password} onChange={onChangePassword} required />
        </div>
        <div style={{marginTop: '10px'}}>
          <Button type='primary' htmlType='submit' loading={false}>Log in</Button>
          <Link href='/signup'><Button>Sign in</Button></Link>
        </div>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
}

export default LoginForm