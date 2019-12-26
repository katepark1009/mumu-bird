import React from 'react'
import PropTypes from 'prop-types'
import { Button, Avatar, Card, Icon } from 'antd'

const PostCard = ({ post }) => {
  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.img && <img alt='example' src={post.img} />}
        actions={[
          <Icon type='retweet' key='retweet' />,
          <Icon type='heart' key='heart' />,
          <Icon type='message' key='message' />,
          <Icon type='ellipsis' key='ellipsis' />,
        ]}
        extra={<Button>Follow</Button>}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
    </div>
  )
}

PostCard.propTypes = {
  post : PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object
  })
}
export default PostCard