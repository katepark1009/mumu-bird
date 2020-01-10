module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // 테이블명은 posts
    content: {
      type: DataTypes.TEXT, // 매우 긴 글은 TEXT
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', //  한글+이모티콘
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    // belongsTo 가 있는 데이블에 다른 테이블의 id를 저장 ( Post 테이블에 UserId 저장 )
    db.Post.belongsTo(db.User) // 테이블에 UserId 컬럼이 생겨요 - hasMany가 거꾸로 되는 경우 user has many post / post belongs to user.
    db.Post.hasMany(db.Comment)
    db.Post.hasMany(db.Image)
    db.Post.belongsTo(db.Post, { as: 'Retweet' }) // 이름이 똑같아서 구별 힘든 경우, 'as'.  RetweetId 컬럼 생겨요
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' })
  }
  return Post
}