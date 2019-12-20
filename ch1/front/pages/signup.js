import React, { useState, useCallback, memo } from 'react'
import { Form, Checkbox, Button, Input } from 'antd'

const TextInput = memo(({value, onChange}) => {
  return (
    <Input name='user-id' value={value} required onChange={onchange} />
  )
}) 
//자식 component를 memo로 덮어서 최적화 시키는 방법: 
//antd에서 Input이 일반 component여서 memo를 사용해서 
//pure component가 적용 안된 일반 component를 강제로 변환, 해당 인풋이 변할때만 랜더링 되도록 할 수 있음.

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('')
  const [term, setTerm] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [termError, setTermError] = useState(false)

  //custom hook for onChange handler
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue)
    const handler = useCallback((e) => {
      //이벤트 리스너들은 특정 컴포넌트 안에 들어가 있는데, 자식 컴포넌트에 전달하는 함수들 => prop으로 넘겨주는 함수들은 useCallback으로 감싸줘야 함.  
      //useState때문에(setState같이 변화가 생기게 되니까) return부분이 다시 실행되고 새로운 함수를 생성하게 되면서 의도치 않은 리랜더링이 발생됨.
      setter(e.target.value)
    }, [])
    return [value, handler]
  }
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