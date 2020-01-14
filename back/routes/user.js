const express = require('express')
const db = require('../models')
const bcrypt = require('bcrypt')
const passport = require('passport')
const router = express.Router()

router.get('/', (req, res)=>{ // 내 정보 가져오기
  // if(!req.user){ //deserializeUser 가 user정보 만들어줌
  //   return res.status(401).send('please log in.')
  // }
  if(!req.user){
    return
  }
  const user = Object.assign({}, req.user.toJSON())
  delete user.password
  return res.json(user)
})
router.post('/', async (req, res, next)=>{ //비동기 promise기 때문에 async,await사용해야 함.
  try{
    //기존 가입되어있는 유저인지 찾기
    const exUser = await db.User.findOne({ //models/index.js 에서 db.User = require('./user')(sequelize, Sequelize);로 연결했기때문에 어디서든 사용 가능. 
      where: {
        userId : req.body.userId
      }
    })
    if(exUser){
      return res.status(403).send('ID in use, please sign up') //400~500 사이의 숫자 보내주기
    }
    //비밀번호 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 12) // 12 숫자가 커질수로 비밀번호 해킹 하기힘들어지고 비밀번호 만드는 시간도 오래걸림. 12~13 사이가 적당
    //새로운 유저 만들기 
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword
    })
    console.log(newUser)
    // .send 는 문자열 .json은 자바스크립트 json객체
    return res.status(200).json(newUser) 
  } catch(e) {
    console.error(e)
    //return res.status(403).send(e)
    //에러 처리 하고 난 후, next 사용해서 넘기기.
    return next(e) //next는 에러 넘길때 사용, 알아서 프론트에 에러 났다고 알려줌. 
  }
})
router.get('/:id', (req, res)=>{ // 남의 정보 가져오기 예) /3 => 가져올때는 req.params.id 로 가져옴.

})
router.post('/logout', (req, res)=>{
  req.logout()
  req.session.destroy() //세션 지워주기
  res.send('log out success')
})
router.post('/login', (req, res, next)=>{
  //passport.authenticate('kakao' ~~ 이 부분에 연동하는 부분 넣어주면 됨.
  //local strategy 실행하는 부분
  passport.authenticate('local', (err, user, info) => { // done에 넣어주었던 에러, 정보, 로직에러 3가지 인수가 여기로 이어짐.
    if(err){
      console.error(err)
      return next(err) //express 가 서버 에러로 보내줌
    }
    if(info){//로직상의 에러인 경우
      return res.status(401).send(info.reason)
    }
    
    return req.login(user, async (loginErr) => { // login시 passport.serializeUser가 실행됨
      try{
        if(loginErr) {
          return next(loginErr)
        }
        const fullUser = await db.User.findOne({ //user 에 hasMany post 관계 정의 했던 것을 시퀄라이즈가 가져옴.
          where: { id: user.id },
          include: [{
            model: db.Post,
            as: 'Posts'
          },{
            model: db.User,
            as: 'Followers',
            attributes: ['id']
          },{
            model: db.User,
            as: 'Followings',
            attributes: ['id']
          }],
          attributes: ['id', 'nickname', 'userId'] //비밀번호 빼고 프론트로 보내주기
        })
        console.log('login success:', fullUser)
        return res.json(fullUser)
        // local.js에서  done(null, user) 가져온 user객체인데 반드시 json으로 변환해주기
        // const filteredUser = Object.assign({}, user.toJSON()) //얕은 복사하기, .toJSON()안하면 에러남./Converting circular structure to JSON
        // delete filteredUser.password //프론트로 보내기 전에 패스워드 지우기
        // return res.json(filteredUser) //프론트로 보내기
    } catch (e){
      next(e)
    }
    })
  })(req, res, next) // 뒤에 이거 안붙이면 에러남.
})
router.get('/:id/follow', (req, res)=>{ // 팔로우 목록 가져오기

})
router.post('/:id/follow', (req, res)=>{ //팔로우 등록 하기
  
})
router.delete('/:id/follow', (req, res)=>{ //팔로우 취소하기
  
})
router.delete('/:id/follower', (req, res)=>{ //팔로워 지우기
  
})
router.get('/:id/posts', (req, res)=>{ //해당유저의 포스트 다 가져오기
  
})

module.exports = router

