import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Avatar, Card, Icon, Input, List, Form, Comment } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../reducers/post'

const PostCard = ({ post }) => {
  const [ commentOpened, setCommentOpened ] = useState(false)
  const [ commentText, setCommentText] = useState('')
  const { me } = useSelector(state=> state.user)
  const { commentAdded, isAddingComment } = useSelector(state=> state.post)
  const dispatch = useDispatch()

  const onToggleComment = useCallback(() => {
    setCommentOpened(prev => !prev) //! 예전 값과 반대로 바꿔줄때 예전 state사용하는 것
  }, []) 

  useEffect(()=>{
    if(commentAdded) {
    setCommentText('') // 동작
    }
  }, [commentAdded]) //[어떤 경우]에 위의 동작을 수행할지 

  const onSubmitComment = useCallback((e)=>{
    e.preventDefault()
    if(!me){
      return alert('please log in.')
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        postId: post.id
      }
    })
  }, [me && me.id]) //객체 넣지 말고 일반값으로 me.id로 넣기, 안그럼 usecallback기억력이 쎄서 처음 null인 상태를 끝까지 기억함.

  const onChangeCommentText = useCallback((e)=>{
    setCommentText(e.target.value)
  })

  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.img && <img alt='example' style={{width: '200px'}} src={post.img} />}
        actions={[
          <Icon type='retweet' key='retweet' />,
          <Icon type='heart' key='heart' />,
          <Icon type='message' key='message' onClick={onToggleComment} />,
          <Icon type='ellipsis' key='ellipsis' />,
        ]}
        extra={<Button>Follow</Button>}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={`${post.content}, id: ${post.id}`}
        />
      </Card>
        {commentOpened && (
          <>
            <Form onSubmit={onSubmitComment}>
              <Form.Item>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
              </Form.Item>
              <Button type='primary' htmlType='submit' loading={isAddingComment}>Done</Button>
            </Form>
            <List
              header={`${post.Comments? post.Comments.length : 0} comment(s)`}
              itemLayout="horizontal"
              dataSource={post.Comments || []}
              renderItem={item=>(
                <li>
                  <Comment 
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    content={item.content}
                    // datetime={item.createdAt}
                  />
                </li>
              )}
            />
          </>
        )}
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