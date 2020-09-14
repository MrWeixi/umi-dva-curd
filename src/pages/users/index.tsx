import React, { useState, FC, useRef } from 'react';
import { Table, Divider, Pagination, Popconfirm, message, Button } from 'antd';

import ProTable, {
  ProColumns,
  TableDropdown,
  ActionType,
} from '@ant-design/pro-table';
import { addRecord, editRecord, delRecord } from './service';

import { connect, Dispatch, Loading, userStates } from 'umi';
import UserModal from './components/UserModal';
import { SingleUseerType, FormValues } from './data.d';
interface UserPageProps {
  users: userStates;
  dispatch: Dispatch;
  userListLoading: boolean;
}
interface ActionTyle {
  reload: () => void;
}

const UserListPage: FC<UserPageProps> = ({
  users,
  dispatch,
  userListLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [record, setRecord] = useState<SingleUseerType | undefined>(undefined);
  const ref = useRef<ActionTyle>();
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
            <a href="#">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  // 修改
  const editHandler = (record: SingleUseerType) => {
    setModalVisible(true);
    setRecord(record);
  };
  // 删除
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
  // 获取表单数据
  const onFinish = async (values: FormValues) => {
    setConfirmLoading(true);
    let id = 0;
    if (record) {
      id = record.id;
    }
    let serviceFun;
    if (id) {
      serviceFun = editRecord;
    } else {
      serviceFun = addRecord;
    }
    const result = await serviceFun({ id, values });
    if (result) {
      setModalVisible(false);
      setConfirmLoading(false);
      message.success(`${id ? 'edit ok' : 'add ok'}`);
      dispatch({
        type: 'users/getRemote',
        payload: {
          page: users.meta.page,
          per_page: users.meta.per_page,
        },
      });
    } else {
      setConfirmLoading(false);
      message.error(`${id ? 'not edit' : 'add not'}`);
    }
  };
  //添加
  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  };
  const reloadHandler = () => {
    ref.current.reload();
  };
  const pagenationHandler = (page: number, pageSize: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: page,
        per_page: pageSize,
      },
    });
  };
  const pageSizeHandler = (current: number, size: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: current,
        per_page: size,
      },
    });
  };
  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Button type="primary" onClick={reloadHandler}>
        Reload
      </Button>
      <ProTable
        columns={columns}
        dataSource={users.data}
        search={false}
        actionRef={ref}
        rowKey="id"
        loading={userListLoading}
        pagination={false}
      />
      <Pagination
        className="list-page"
        current={users.meta.page}
        onChange={pagenationHandler}
        onShowSizeChange={pageSizeHandler}
        total={users.meta.total}
        pageSize={users.meta.per_page}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
      />
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
        confirmLoading={confirmLoading}
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
