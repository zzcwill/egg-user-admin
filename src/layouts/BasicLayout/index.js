import React, { useState, useEffect, useContext } from 'react';
import { Layout } from 'antd';
import { observer } from 'mobx-react';
import SiderMenu from '../SiderMenu';
import MainHeader from '../MainHeader';
// import MainFooter from "../MainFooter";

import { getInfo } from "@/api/common";
import { appStores } from '@/stores';
import './style.less';

const BasicLayout = ({ route, children }) => {
  const { globalStore } = appStores();

  const getUserInfo = async () => {
    let toData = await getInfo()

    globalStore.setData({
      userInfo: toData.data
    });
  };
  getUserInfo()

  return (

    <Layout className="main-layout">
      <SiderMenu routes={route.childRoutes} />
      {/* 左侧菜单导航 */}
      <Layout className="main-layout-right">
        <MainHeader />
        <Layout.Content className="main-layout-content">
          {children}
          {/* <MainFooter></MainFooter> */}
        </Layout.Content>
      </Layout>
    </Layout>
  )
};

export default observer(BasicLayout);
