import request, { extend } from 'umi-request';
import { message } from 'antd';

const errorHandler = function(error) {
  const codeMessage = {
    '200': '服务器成功返回请求的数据。',
    '201': '新建或修改数据成功。',
    '202': '一个请求已经进入后台排队（异步任务）。',
    '204': '删除数据成功。',
    '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    '401': '用户没有权限（令牌、用户名、密码错误）。',
    '403': '用户得到授权，但是访问是被禁止的。',
    '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    '406': '请求的格式不可得。',
    '410': '请求的资源被永久删除，且不会再得到的。',
    '422': '当创建一个对象时，发生一个验证错误。',
    '500': '服务器发生错误，请检查服务器。',
    '502': '网关错误。',
    '503': '服务不可用，服务器暂时过载或维护。',
    '504': '网关超时。',
  };
  if (error.response) {
    message.error(codeMessage[error.response.status]);
  } else {
    message.error('网络出错');
  }
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
  return extendRequest('/api/users', {
    method: 'get',
  })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return false;
    });
};
export const editRecord = async ({ id, values }) => {
  return extendRequest(`/api/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function(response) {
      return true;
    })
    .catch(function(error) {
      return false;
    });
};
export const delRecord = async ({ id }) => {
  return extendRequest(`/api/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      message.success('Edit successfully');
    })
    .catch(function(error) {
      return false;
    });
};
export const addRecord = async ({ payload }) => {
  return extendRequest('/api/users', {
    method: 'post',
    data: payload,
  })
    .then(function(response) {
      return true;
    })
    .catch(function(error) {
      return false;
    });
};
