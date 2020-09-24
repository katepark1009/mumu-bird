import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';
import { Row, Col } from 'antd';

const NicknameEditForm = () => {
  const [editedName, setEditedName] = useState('');
  const dispatch = useDispatch();
  const { me, isEditingNickname } = useSelector(state => state.user);

  const onChangeNickname = useCallback((e) => {
    setEditedName(e.target.value);
  }, []);

  const onEditNickname = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: EDIT_NICKNAME_REQUEST,
      data: editedName,
    });
  }, [editedName]);

  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #4ea2cc', padding: '20px' }} onSubmit={onEditNickname}>
      <h4>Edit nickname</h4>
      <div style={{ display: 'flex'}}>
        <Input addonBefore="Nickname" value={editedName || (me && me.nickname)} onChange={onChangeNickname} />
        <Button type="primary" htmlType="submit" loading={isEditingNickname}>Edit</Button>
      </div>
    </Form>
  )
}

export default NicknameEditForm