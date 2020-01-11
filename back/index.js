const express = require('express')
const db = require('./models')
const dotenv = require('dotenv');
const userAPIRouter = require('./routes/user')
const postAPIRouter = require('./routes/post')
const postsAPIRouter = require('./routes/posts')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')

dotenv.config();
const app = express();
db.sequelize.sync();

app.use(morgan('dev')) // 로그 기록 남김 ex) 콘솔로그 보면 OPTIONS /api/user 200 4.526 ms - 13
//app.use('/', morgan('dev')) 모든 것에 적용하는 경우 '/' 생략 
app.use(express.json()) //json 형식의 본문 처리 - bodyparser안써도 express에서 지원해줌
app.use(express.urlencoded({extended:true})) //폼으로 넘어온 데이터 처리 위해 필요

app.use(cors()) 

//사용자 정보는 서버의 세션, 프론트에는 세션을 조회할 수 있는 쿠키 전달 - jwt는 대량 웹사이트 인 경우만 추천.
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(expressSession({
  resave: false, //! 필수: 매번 세션 강제 저장
  saveUninitialized: false, //! 필수: 빈 값도 저장
  secret: process.env.COOKIE_SECRET, // cookieparser에 같이 넣어주기. 암호화 하는 작업.
  cookie: {
    httpOnly: true, //js에서 쿠키에 접근 못하도록 해킹 방지.
    secure: false, //https 쓸때 true로 바꿔주기
  }
}))

// passport : 서버쪽 세션 두기, 프론트에 쿠키 보내기, 누가 로그인 했는지 확인하는 작업을 모든 라우터에 붙여줘야 하기 때문에 사용
app.use(passport.initialize()) // passport는 expresssession완료 후 이므로 밑에 써주기.
app.use(passport.session())

//router로 파일 분리
//API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구임. 프론트가 백엔드에 요청보내면 실행 가능하도록.
//'api'라는걸 알려주기 위해 붙임. 
app.use('/api/user', userAPIRouter) //router에서 가져온 user부분 라우트 
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)

app.listen(3065, () => {
  console.log(`✨Server is running on http://localhost:3065`)
})