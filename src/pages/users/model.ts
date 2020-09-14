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
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      const data = yield call(getRemoteList, { page, per_page });
      if (data) {
        yield put({
          type: 'getList',
          payload: data,
        });
      }
    },
    *del({ payload: { id } }, { put, call, select }) {
      const data = yield call(delRecord, { id });
      if (data) {
        const { page, per_page } = yield select(
          (state: any) => state.users.meta,
        );
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
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
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};
export default UserModel;
