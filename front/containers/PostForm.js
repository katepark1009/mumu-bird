import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
  const imageInput = useRef();

  useEffect(() => {
    if (postAdded) {
      setText('');
    }
  }, [postAdded]);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((i) => {
      formData.append('image', i); //req.body - image
    });
    formData.append('content', text); //req.body - content
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => { // key/val 로 append해서 formdata 보내줘야함
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback(index => () => { //onRemoveImage(i) 처럼 괄호 넣어서 쓰는 경우 고차함수로 () => 괄호 한번더 해줘야 함
    dispatch({
      type: REMOVE_IMAGE,
      index,
    });
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
      <Input.TextArea maxLength={140} placeholder="What's happening?" value={text} onChange={onChangeText} />
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <Button onClick={onClickImageUpload}>
            Image upload
          </Button>
          <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>Tweet</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
