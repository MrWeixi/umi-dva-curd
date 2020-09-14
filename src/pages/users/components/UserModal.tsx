import React, { useEffect, FC } from 'react';
import { Modal, Form, Input, DatePicker, Switch } from 'antd';
import { SingleUseerType, FormValues } from '../data';
import moment from 'moment';
interface UserModalProps {
  record: SingleUseerType | undefined;
  visible: boolean;
  confirmLoading: boolean;
  closeHandler: () => void;
  onFinish: (values: FormValues) => void;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const UserModal: FC<UserModalProps> = props => {
  const [form] = Form.useForm();
  const { visible, record, closeHandler, onFinish, confirmLoading } = props;
  // 生命周期
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        create_time: moment(record.create_time),
        status: Boolean(record.status),
      });
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
        title={record ? '编辑' + record.id : '添加'}
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
        confirmLoading={confirmLoading}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名称"
            name="name"
            rules={[{ required: true, message: 'name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="用户邮箱"
            name="email"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="创建时间" name="create_time">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            valuePropName="checked"
            initialValue={{
              status: true,
            }}
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default UserModal;
