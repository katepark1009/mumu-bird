const express = require('express')
const db = require('../models')
const multer = require('multer');
const path = require('path');

const { isLoggedIn } = require('./middleware');

const router = express.Router()

const upload = multer({
  storage: multer.diskStorage({ // 나중에 이 부분을 s3에 업로드
    destination(req, file, done) { 
      done(null, 'uploads'); // done(에러가 있을때, 성공했을 때)
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); // 제로초.png, ext===.png, basename===제로초
      done(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/post
  // 폼 데이터 파일(이미지)-> req.file(s), 폼데이터 일반값(텍스트)-> req.body
    try {
      const hashtags = req.body.content.match(/#[^\s]+/g);
      const newPost = await db.Post.create({
        content: req.body.content, // ex) '제로초 파이팅 #구독 #좋아요 눌러주세요'
        UserId: req.user.id,
      });
      if (hashtags) {
        const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() },
        })));
        await newPost.addHashtags(result.map(r => r[0]));
      }
      if (req.body.image) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
        if (Array.isArray(req.body.image)) {
          const images = await Promise.all(req.body.image.map((image) => {
            return db.Image.create({ src: image });
          }));
          await newPost.addImages(images);
        } else { // 이미지를 하나만 올리면 image: 주소1
          const image = await db.Image.create({ src: req.body.image });
          await newPost.addImage(image);
        }
      }
      // const User = await newPost.getUser();
      // newPost.User = User;
      // res.json(newPost);
      const fullPost = await db.Post.findOne({
        where: { id: newPost.id },
        include: [{
          model: db.User,
        }, {
          model: db.Image,
        }],
      });
      res.json(fullPost);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

router.post('/images', upload.array('image'), (req, res)=>{ // 이미지 가져오기 -> form data에 append한 이름과 'image'가 일치해야함
   //upload.array 이미지 여러개 업로드
  //upload.fields([ {name: 'image'}, {name: 'img'}]) - 이미지 이름을 다르게 한 경우
  //upload.none() 하나도 안올리는 경우

  res.json(req.files.map(v => v.filename));
})


router.get('/:id', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }],
    });
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await db.Post.destroy({ where: { id: req.params.id } });
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/comments', async (req, res, next) => { 
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [['createdAt', 'ASC']],
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }],
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/comment', isLoggedIn,  async (req, res, next) => { // POST /api/post/1000000/comment
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    });
    await post.addComment(newComment.id);
    //저장끝
    //다시 프런트로 보냄
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }],
    });
    return res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id }});
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await post.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id }});
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/retweet', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.Post,
        as: 'Retweet',
      }],
    });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    const retweetTargetId = post.RetweetId || post.id; // 원본을 리트윗, 리트윗한 글을 다시 리트윗 했는지 체크
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    if (exPost) {
      return res.status(403).send('이미 리트윗했습니다.');
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Post,
        as: 'Retweet',
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }, {
          model: db.Image,
        }],
      }],
    });
    res.json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router