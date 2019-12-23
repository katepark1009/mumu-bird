import React, { useState, useCallback, memo } from 'react'
import { Form, Checkbox, Button, Input } from 'antd'
import { useInput } from '../components/customHook/hooks'
// const TextInput = memo(({value, onChange}) => {
//   return (
//     <Input name='user-id' value={value} required onChange={onchange} />
//   )
// }) 
//자식 component를 memo로 덮어서 최적화 시키는 방법: 
//antd에서 Input이 일반 component여서 memo를 사용해서 
//pure component가 적용 안된 일반 component를 강제로 변환, 해당 인풋이 변할때만 랜더링 되도록 할 수 있음.

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('')
  const [term, setTerm] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [termError, setTermError] = useState(false)

  //Hook은 함수, 조건문, 반복문 안에는 넣지 말기
  const [id, onChangeId] = useInput('')
  const [nick, onChangeNick] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (password !== passwordCheck) {
      return setPasswordError(true)
    }
    if (!term) {
      return setTermError(true)
    }
  }, [password, passwordCheck, term])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password)
    setPasswordCheck(e.target.value)
  }, [password]) //함수 안에서 사용하는 state를 deps(디펜던시) array안에 넣어주어야 함.

  const onChangeTerm = useCallback((e) => {
    setTermError(false)
    setTerm(e.target.checked)
  }) //함수 안에서 사용하는 state 없을때는 [] 생략

  console.log({
    id,
    nick,
    password,
    passwordCheck,
    term
  })


  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 20 }}>
        <div>
          <label htmlFor='user-id'>ID</label>
          <Input name='user-id' required value={id} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor='user-nick'>Nick name</label>
          <Input name='user-nick' required value={nick} onChange={onChangeNick} />
        </div>
        <div>
          <label htmlFor='user-password'>Password</label>
          <Input name='user-password' type='password' value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor='user-password-check'>Check Password</label>
          <Input name='user-password-check' type='password' value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <div style={{ color: 'red' }}>Password is not matched.</div>}
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>agree with terms</Checkbox>
          {termError && <div style={{ color: 'red' }}>Please check agree.</div>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type='primary' htmlType='submit'>Join</Button>
        </div>
      </Form>
    </>
  )
}

export default Signup