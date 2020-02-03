// hash 태그 주소 같은 경우 #좋아요는 주소창에서 /좋아요 로 다이나믹하게 바뀌기 때문에
// next와 express를 연결해서 다이나믹하게 주소 바꿀 수 있도록 연결

const express = require('express')
const next = require('next')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const dotenv = require('dotenv')

const dev = process.env.NODE_ENV !== 'production'
const prod = process.env.NODE_ENV === 'production'

const app = next({ dev }) // next 와 express 연결해주는 역할
const handle = app.getRequestHandler()
dotenv.config()

app.prepare().then(() => {
  const server = express()

  server.use(morgan('dev'))
  server.use(express.json())
  server.use(express.urlencoded({ extended: true}))
  server.use(cookieParser(process.env.COOKIE_SECRET))
  server.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    }
  }))

  server.get('*', (req, res) => { // 모든 get 요청을 여기서 처리
    return handle(req, res)
  })

  server.listen(3060, () => {
    console.log('next+express running on port 3060')
  })
})