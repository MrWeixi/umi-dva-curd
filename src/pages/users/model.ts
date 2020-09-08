import { Reducer,Effect,Subscription  } from 'umi'

interface UserModelType{
    namespace:'users';
    state:{};
    reducers:{},
    effects:{},
    subscriptions:{
      setup:Subscription  
    }
}

const UserModel:UserModelType = {
  namespace: 'users',
  state: {},
  reducers: {
  
  },
  effects: {
 
  },
  subscriptions: {
      setup({dispatch,history}){

      }
  },
};
export default UserModel;
