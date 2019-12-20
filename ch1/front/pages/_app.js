//index.도 부모컴포넌트로 이 파일을 사용하게 됨. 공통되는 layout부분 넣으면 됨.

import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
//index, profile 이런 파일들을 component로 넣어주게 됨. 공통되는 레이아웃 같은거 한번에 적용할때.

const MumuBird = ({Component}) => {
  return (
    <>
      <Head>
        <title>MumuBirrrrrd</title>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css' />
      </Head> 
      <AppLayout>
        <Component /> 
      </AppLayout>
    </>
  )
}

export default MumuBird