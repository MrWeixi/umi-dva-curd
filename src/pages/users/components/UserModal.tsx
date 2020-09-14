import React, { useEffect, FC } from 'react';
import { Modal, Form, Input } from 'antd';
import { SingleUseerType, FormValues } from '../data';

interface UserModalProps {
  record: SingleUseerType | undefined;
  visible: boolean;
  confirmLoading: boolean;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
}

const UserModal: FC<UserModalProps> = props => {
  const [form] = Form.useForm();
  const { visible, record, closeHandler, onFinish, confirmLoading } = props;
  // 生命周期
  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [visible]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (err: any) => {
    console.log(err);
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="createTime" name="create_time">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default UserModal;
