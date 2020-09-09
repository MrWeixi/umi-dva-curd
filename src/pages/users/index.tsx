import React, { useState } from 'react';
import { Table, Divider } from 'antd';
import { connect } from 'umi';
import UserModal from './components/UserModal';
const index = ({ users }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => editHandler(record)}>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const editHandler = record => {
    setModalVisible(true);
    setRecord(record.id);
  };
  const closeHandler = () => {
    setModalVisible(false);
  };

  return (
    <div className="list-table">
      <Table columns={columns} dataSource={users.data} />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
      />
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(index);
