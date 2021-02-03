import React from 'react';
import ReactDom from 'react-dom';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

import './styles/main.less';
import AppRouter from './routers/AppRouter';


// 更改.env.development的REACT_APP_BASE_API为 mock即可mock数据
import { mockXHR } from './mock'
console.info(process)
if (process.env.REACT_APP_BASE_API === '/mock') {
  mockXHR()
}

const App = () => (
  <ConfigProvider locale={zhCN}>
    <AppRouter />
  </ConfigProvider>
);


ReactDom.render(<App />, document.getElementById('app'));

// 热更新
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('module.hot，', err);
    }
  });
}
