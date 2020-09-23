import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Document, { Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// hooks로는 안됨.
class MyDocument extends Document {
  static getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    // APP 을 실행시켜주느 부분. renderPage
    const page = context.renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, helmet: Helmet.renderStatic(), styleTags };
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent(); // html 객체 -> 컴포넌트 형식으로 
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          {/* 이 부분에 helmet 넣어주는게 중요 */}
          {this.props.styleTags}
          {/* helmet안에 있는 meta script 태그 들을 붙여줌 */}
          {Object.values(helmet).map(el => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          {/* Main 이 app.js임 */}
          <Main />
          {process.env.NODE_ENV === 'production'
          && <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />}
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.propTypes = {
  helmet: PropTypes.object.isRequired,
  styleTags: PropTypes.object.isRequired,
};

export default MyDocument;
