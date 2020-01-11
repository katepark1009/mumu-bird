const express = require('express')
const db = require('../models')
const bcrypt = require('bcrypt')

const router = express.Router()

router.get('/', (req, res)=>{ // 내 정보 가져오기

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
  
})
router.post('/login', (req, res)=>{
  
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

