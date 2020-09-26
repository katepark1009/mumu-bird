//index.도 부모컴포넌트로 이 파일을 사용하게 됨. 공통되는 layout부분 넣으면 됨.

import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import PropTypes from 'prop-types'
import reducer from '../reducers/index'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga';
import { createStore, compose, applyMiddleware } from 'redux'
import axios from 'axios';
import { Container } from 'next/app';
//index, profile 이런 파일들을 component로 넣어주게 됨. 공통되는 레이아웃 같은거 한번에 적용할때.
import createSagaMiddleware from 'redux-saga';
import Helmet from 'react-helmet';
import rootSaga from '../sagas'
import { LOAD_USER_REQUEST } from '../reducers/user';

const MumuBird = ({Component, store, pageProps}) => {
  return (
    <Container>
      <Provider store={store}>
        {/* 모든 페이지에 공통되는 head 태그들 helmet으로 넣어주기 */}
        {/* 개별 페이지의 helmet은 공통 태그보다 우선순위로, 덮어씀 */}
        <Helmet
            title="MumuBirrrrrd"
            htmlAttributes={{ lang: 'ko' }}
            meta={[{
              charset: 'UTF-8',
            }, {
              name: 'viewport',
              content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
            }, {
              'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
            }, {
              name: 'description', content: 'MumuBirrrrrd SNS',
            }, {
              name: 'og:title', content: 'MumuBirrrrrd',
            }, {
              name: 'og:description', content: 'MumuBirrrrrd SNS',
            }, {
              property: 'og:type', content: 'website',
            }, {
              property: 'og:image', content: 'http://localhost:3060/favicon.ico',
            }]}
            link={[{
              rel: 'shortcut icon', href: '/favicon.ico',
            }, {
              rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
            }, {
              rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
            }, {
              rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
            },{
              rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,600&display=swap',
            }]}
          />
        <AppLayout>
          <Component {...pageProps} /> 
        </AppLayout>
      </Provider>
    </Container>
  )
}

MumuBird.propTypes = {
  Component: PropTypes.elementType, //node는 랜더링 될 수 있는 모든 것
  store: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}

MumuBird.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (ctx.isServer && cookie) {
    axios.defaults.headers.Cookie = cookie; // 모든 axios에 기본 적용
  }
  const state = ctx.store.getState();
  if (!state.user.me) {
    ctx.store.dispatch({
      type: LOAD_USER_REQUEST,
    });
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx) || {};
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
  store.sagaTask = sagaMiddleware.run(rootSaga); // withReduxSaga사용시 store.sagaTask 필요
  return store
}

export default withRedux(configureStore)(withReduxSaga(MumuBird));
//기존 컴포넌트의 기능을 확장해주는 고차함수 사용, 이부분은 외우자....