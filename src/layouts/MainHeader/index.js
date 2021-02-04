import React from 'react';
import { Layout, Dropdown, Menu, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { SmileOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Modal } from "antd";

import { removeToken } from "@/services/config";
import { logout } from "@/api/common";
import { appStores } from '@/stores';
import './style.less';

const MainHeader = () => {
  const { globalStore } = appStores(); 
  const history = useHistory();

  const handleLogout = () => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        let apiData = await logout();
        removeToken()
        history.push('/login');
      },
    });
  };  
  
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout();
        break;       
      default:
        break;
    }
  };
  
  const menu = (
      <Menu onClick={onClick}>
        <Menu.Item key="dashboard">
          <Link to="/dashboard">首页</Link>
        </Menu.Item>
        <Menu.Item key="project">
          <a
            target="_blank"
            href="https://www.baidu.com/"
            rel="noopener noreferrer"
          >
            百度
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          &nbsp; 退出      
        </Menu.Item>
      </Menu>
  );  

  return (
    <Layout.Header className="main-header">
      <Row type="flex" style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
          <span className="trigger" onClick={globalStore.toggleCollapsed}>
            {globalStore.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
            <div className="user-info">
              <span className="user-img" />
              <span className="user-name">{globalStore.userInfo.loginName}</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default observer(MainHeader);
