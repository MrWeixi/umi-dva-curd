import React from 'react';
import { Modal, Button } from 'antd';

const UserModal = props => {
  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={props.visible}
        onOk={props.closeHandler}
        onCancel={props.closeHandler}
      >
        {props.record}
      </Modal>
    </div>
  );
};
export default UserModal;
