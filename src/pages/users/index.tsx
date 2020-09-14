import React, { useState, FC } from 'react';
import { Pagination, Popconfirm, message, Button } from 'antd';

import ProTable, { ProColumns } from '@ant-design/pro-table';
import { addRecord, editRecord } from './service';

import { connect, Dispatch, Loading, userStates } from 'umi';
import UserModal from './components/UserModal';
import { SingleUseerType, FormValues } from './data.d';
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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [record, setRecord] = useState<SingleUseerType | undefined>(undefined);
  const columns: ProColumns<SingleUseerType>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',
      valueType: 'text',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      key: 'create_time',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (text: any, record: SingleUseerType) => [
        <a onClick={() => editHandler(record)}>编辑</a>,
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={() => {
            delHandler(record.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">删除</a>
        </Popconfirm>,
      ],
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
      resetHandler();
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
  const pagenationHandler = (page: number, pageSize?: number) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: page,
        per_page: pageSize ? pageSize : users.meta.per_page,
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

  const resetHandler = () => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: users.meta.page,
        per_page: users.meta.per_page,
      },
    });
  };
  return (
    <div className="list-table">
      <ProTable
        columns={columns}
        dataSource={users.data}
        search={false}
        rowKey="id"
        headerTitle="User list"
        loading={userListLoading}
        pagination={false}
        options={{
          density: true,
          fullScreen: true,
          reload: () => {
            resetHandler();
          },
          setting: true,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={addHandler}>
            新建
          </Button>,
          <Button type="default" onClick={resetHandler}>
            刷新
          </Button>,
        ]}
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
