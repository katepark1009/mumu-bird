import React, { useState, useCallback } from 'react'

//custom hook for onChange handler
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue)
  const handler = useCallback((e) => {
    //이벤트 리스너들은 특정 컴포넌트 안에 들어가 있는데, 자식 컴포넌트에 전달하는 함수들 => prop으로 넘겨주는 함수들은 useCallback으로 감싸줘야 함.  
    //useState때문에(setState같이 변화가 생기게 되니까) return부분이 다시 실행되고 새로운 함수를 생성하게 되면서 의도치 않은 리랜더링이 발생됨.
    setter(e.target.value)
  }, [])
  return [value, handler]
}