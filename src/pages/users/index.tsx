import React, { useState, FC } from 'react';
import { Table, Divider, Popconfirm, Button } from 'antd';
import { connect, Dispatch, Loading, userStates } from 'umi';
import UserModal from './components/UserModal';
import { SingleUseerType } from './data.d';
interface UserPageProps {
  users: userStates;
  dispatch: Dispatch;
  userListLoading: boolean;
}
const UserListPage: FC<UserPageProps> = ({
  users,
  dispatch,
  userListLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUseerType | undefined>(undefined);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: SingleUseerType) => (
        <span>
          <a onClick={() => editHandler(record)}>Edit</a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => {
              delHandler(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <a href="#" onClick={() => delHandler(record)}>
              Delete
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const editHandler = (record: SingleUseerType) => {
    setModalVisible(true);
    setRecord(record);
  };
  const delHandler = (id: number) => {
    dispatch({
      type: 'users/del',
      payload: {
        id,
      },
    });
  };
  const closeHandler = () => {
    setModalVisible(false);
  };
  const onFinish = values => {
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'users/edit',
        payload: {
          values,
          id,
        },
      });
    } else {
      dispatch({
        type: 'users/add',
        payload: values,
      });
    }
    setModalVisible(false);
  };
  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  };
  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={users.data}
        rowKey="id"
        loading={userListLoading}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: {
  users: userStates;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};
export default connect(mapStateToProps)(UserListPage);

// 16.29
