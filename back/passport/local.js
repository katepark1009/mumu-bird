const passport = require('passport')
const db = require('../models')

module.exports = () => {
  //서버쪽에 [{id: 3, cookie: 'alskd'} 이런 식으로 저장을 함, 이 쿠키 'alskd'는 id 3번이랑 연결되어있구나라고 알아차림. 서버쪽에는 id:3만 저장함.
  passport.serializeUser(user, done) => {
    return done(null, user.id)
  }

  passport.deserializeUser(async(id, done) => { //id 밖에 없으니까 나머지 유저정보 불러오는 과정
    try {
      const user = await db.User.findOne({
        where: { id }
      })
      return done(null, user) //! req.user // id:3을 바탕으로 유저의 정보를 가져오기. 
    } catch(e) {
      console.error(e)
      return done(e)
    }
  })
}