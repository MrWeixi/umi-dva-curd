import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList, editRecord, addRecord, delRecord } from './service';
import { message } from 'antd';

import { SingleUseerType } from './data.d';

export interface userStates {
  data: SingleUseerType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}
interface UserModelType {
  namespace: 'users';
  state: userStates;
  reducers: {
    getList: Reducer<userStates>;
  };
  effects: {
    getRemote: Effect;
    add: Effect;
    edit: Effect;
    del: Effect;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModelType = {
  namespace: 'users',
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getRemote(action, { put, call }) {
      const data = yield call(getRemoteList);
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *edit({ payload: { id, values } }, { put, call }) {
      const data = yield call(editRecord, { id, values });
      if (data) {
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('Not');
      }
    },
    *del({ payload: { id } }, { put, call }) {
      const data = yield call(delRecord, { id });
      if (data) {
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('Not');
      }
    },
    *add({ payload }, { put, call }) {
      const data = yield call(addRecord, { payload });
      if (data) {
        yield put({
          type: 'getRemote',
        });
      } else {
        message.error('Not');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};
export default UserModel;
