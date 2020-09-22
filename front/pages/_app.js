//index.도 부모컴포넌트로 이 파일을 사용하게 됨. 공통되는 layout부분 넣으면 됨.

import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import PropTypes from 'prop-types'
import reducer from '../reducers/index'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { createStore, compose, applyMiddleware } from 'redux'
//index, profile 이런 파일들을 component로 넣어주게 됨. 공통되는 레이아웃 같은거 한번에 적용할때.
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas'

const MumuBird = ({Component, store, pageProps}) => {
  return (
    <Provider store={store}>
      <Head>
        <title>MumuBirrrrrd</title>
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.css' />
      </Head> 
      <AppLayout>
        <Component {...pageProps} /> 
      </AppLayout>
    </Provider>
  )
}

MumuBird.propTypes = {
  Component: PropTypes.elementType, //node는 랜더링 될 수 있는 모든 것
  store: PropTypes.object
}

MumuBird.getInitialProps = async (context) => {
  console.log(context);
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

const configureStore = (initialState, options) => { //여기서 부터는 바뀔 일이 거의 없는 부분, compose는 미들웨어 여러개 합성하는 역할
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware] //리덕스 사가 미들웨어 또는 thunk 등등이 바뀌는 부분이 바로 여기 나머지는 거의 변동 없음.
  const enhancer = compose( 
    applyMiddleware(...middlewares),
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__(): (f) => f,
    // typeof window !== 'undefined' 를 !options.isServer && 로 대체가능
    // 넥스트에서 제공하는 속성으로 !options.isServer 서버인지 아닌지 판단가능!
  ) //applyMiddleware 를 사용해서 middleware를 강화시기는 것.
  
  //배포할때는 devtool 빼야 함....!! 보안 위험. 

  // const enhancer = process.env.NODE_ENV !== 'production' 
  //   ? compose( 
  //   applyMiddleware(...middlewares),
  //   typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__(): (f) => f,
  //   : compose( 
  //   applyMiddleware(...middlewares),

  const store = createStore(reducer, initialState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}

export default withRedux(configureStore)(MumuBird) //기존 컴포넌트의 기능을 확장해주는 고차함수 사용, 이부분은 외우자....