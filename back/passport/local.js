const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const bcrypt = require('bcrypt')
const db = require('../models')

module.exports = () => {
  passport.use( new LocalStrategy({
    usernameField: 'userId', // req.body에 넣어주는 것
    passwordField: 'password',
  }, async (userId, password, done) => { // 위의 id, password를 가져와서 아래 부분 실행, 로그인 전략 수행 = 어떤 사람을 로그인 시킬지?
    try {
      const user = await db.User.findOne({ where: { userId }})
      if(!user) {
        return done(null, false, {reason: 'No user found!'}) 
        //done( 첫번째는 서버쪽 에러가 나면 1을 넣어줌, 두번째는 성공시, 세번째는 로직상 에러인 경우)
      }
      const result = await bcrypt.compare(password, user.password) // 프론트의 비번과 서버쪽 비번 비교\
      if(result) {
        return done(null, user) //성공시 유저 정보 전달
      }
      return done(null, false, {reason: 'wrong password!'})
    } catch(e) {
      console.error(e)
      return done(e) // 서버 에러는 done의 첫번째 인수에 담아서 보내줌.
    }
  }))
}
//모두 에러없이 성공하는 경우, routes/user 에서 passport.Authenticate 부분이 실행됨