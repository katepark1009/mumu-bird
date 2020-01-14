const passport = require('passport')
const db = require('../models')
const local = require('./local')

module.exports = () => {
  //서버쪽에 [{id: 3, cookie: 'alskd'} 이런 식으로 저장을 함, 이 쿠키 'alskd'는 id 3번이랑 연결되어있구나라고 알아차림. 서버쪽에는 id:3만 저장함.
  passport.serializeUser( (user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser(async(id, done) => { //id 밖에 없으니까 나머지 유저정보 불러오는 과정
    try {
      const user = await db.User.findOne({
        where: { id },
        include: [{
          model: db.Post,
          as: 'Posts',
          attributes: ['id']
        },{
          model: db.User,
          as: 'Followings',
          attributes: ['id']
        },{
          model: db.User,
          as: 'Followers',
          attributes: ['id']
        } ]
      })
      return done(null, user) //! req.user // id:3을 바탕으로 유저의 정보를 가져오기. 
    } catch(e) {
      console.error(e)
      return done(e)
    }
  })
  local() //local 전략 연결하기, 함수이기때문에 실행됨.
}

// 프론트에서 서버로는 cookie만 보냄('alskd') - 누구껀지 모름+보안 높음
// 서버가 쿠키파서, 익스프레스 세션안에 저장된 {id: 3, cookie: 'alskd'} 검사 후 id: 3 발견
// id : 3이 deserializeUser에 들어가서 사용자 정보(모든 정보 담긴)가 생김 
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과를 캐싱해서 1번 찾은 유저는 다시 안찾아도 되도록