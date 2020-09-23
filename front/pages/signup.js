import React, { useState, useCallback, useEffect } from 'react'
import { Form, Checkbox, Button, Input } from 'antd'
import { useInput } from '../components/customHook/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST } from '../reducers/user'
import Router from 'next/router'
// const TextInput = memo(({value, onChange}) => {
//   return (
//     <Input name='user-id' value={value} required onChange={onchange} />
//   )
// }) 
//자식 component를 memo로 덮어서 최적화 시키는 방법: 
//antd에서 Input이 일반 component여서 memo를 사용해서 
//pure component가 적용 안된 일반 component를 강제로 변환, 해당 인풋이 변할때만 랜더링 되도록 할 수 있음.

const SignupError = styled.div`
  color: red;
`;

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('')
  const [term, setTerm] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [termError, setTermError] = useState(false)

  //Hook은 함수, 조건문, 반복문 안에는 넣지 말기
  const [id, onChangeId] = useInput('')
  const [nick, onChangeNick] = useInput('')
  const [password, onChangePassword] = useInput('')

  const dispatch = useDispatch()
  const { isSigningUp, me } = useSelector(state=> state.user)

  useEffect(()=>{ // 객체끼리 비교가 어렵기때문에 useEffect안에 넣지 말기
    if(me) {
      alert('로그인 했으니 메인페이지로 이동')
      Router.push('/') // 내 정보가 있는 경우, next 라우터에서 메인 페이지로 이동
    }
  }, [me && me.id]) //객체가 undefined일수도 있으니까 &&으로 가드쳐주기

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (password !== passwordCheck) {
      return setPasswordError(true)
    }
    if (!term) {
      return setTermError(true)
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId : id, 
        password, 
        nickname: nick
      }
    })
  }, [id, nick, password, passwordCheck, term]) //! usecallback 안에서 쓰이는 state들은 다 [] 안에 적어줘야 함

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

  if(me) { // 로그인 상태시 화면 감춤
    return null
  }

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
          {passwordError && <SignupError>Password is not matched.</SignupError>}
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>agree with terms</Checkbox>
          {termError && <SignupError>Please check agree.</SignupError>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type='primary' htmlType='submit' loading={isSigningUp}>Join</Button>
        </div>
      </Form>
    </>
  )
}

export default Signup