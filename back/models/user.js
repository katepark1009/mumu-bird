module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // 테이블명은 users . 앞부분 소문자 뒤에 복수형 자동으로.
    nickname: {
      type: DataTypes.STRING(20), // 20글자 이하
      allowNull: false, // 필수
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true, // 고유한 값
    },
    password: {
      type: DataTypes.STRING(100), // 100글자 이하
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글이 저장돼요
  });

  User.associate = (db) => {
    //값을 가져올때 as에 명시된 이름으로 배열을 가져옴. as는 구별의 용도로 사용.
    db.User.hasMany(db.Post, { as: 'Posts' }) // hasMany : One-to-many association. User. Post 관계가 겹치는 경우 { as: 'Posts' }로 구분지어주기
    db.User.hasMany(db.Comment)
    // belongsToMany는 as를 달아주는게 좋음!
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); //through 중간 테이블이름.
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' })
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' }) 
    // 같은 User테이블에서 가져오기 때문에 as는 자바스크립트 객체에서 사용할 이름, 
    // foreingnKey는 실제 DB 컬럼명. DB에서 구별하는 이름. 
    //! as: 'Followers', foreignKey: 'followingId' : 팔로워와 팔로잉 반대인 이유는 남의 테이블 id를 가르키기 때문에  
  }

  return User
}