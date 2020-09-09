import { request } from 'umi';
export const getRemoteList = async () => {
  return request('/api/users', {
    method: 'get',
  })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};
