import React from 'react';
import { history } from 'umi';
import { Button } from 'antd';

export default () => {
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          history.push('/users');
        }}
      >
        Primary Button
      </Button>
    </div>
  );
};
