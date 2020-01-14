const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => { //db 불러온 후에 사용
  if (db[modelName].associate) {
    db[modelName].associate(db); //테이블 간 관계를 불러오는 부분
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
