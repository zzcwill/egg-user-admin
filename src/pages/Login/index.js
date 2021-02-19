import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getToken, setToken } from "@/services/config";

import { login } from "@/api/common";
import { appStores } from '@/stores';
import './style.less';

const LoginPage = () => {
  const history = useHistory();
  const { globalStore } = appStores();

  useEffect(() => {
    let token = getToken();
    if (token) {
      history.push('/home');
    }
  });

  const handleSubmit = async (values) => {
    const { userName, password } = values;
    let loginData = {
      userName,
      password
    }
    // 登录完成后 发送请求 调用接口获取用户信息
    let apiData = await login(loginData)

    if(!apiData.data.token) {
      apiData.data.token = 'token'
    }
    setToken(apiData.token)
    history.push('/home');
  };  

  return (  
    <div className="login-container">
      <Form onFinish={handleSubmit} className="content">
        <div className="title">
          <h2>用户登录</h2>
        </div>
        <Spin spinning={false} tip="登录中...">
          <Form.Item 
              name="userName" 
              rules={[{ required: true, whitespace: true, message: '请输入用户名！' }]}
              initialValue= "18088888888"
            >
            <Input 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"            
            />
          </Form.Item>     
          <Form.Item 
            name="password" 
            rules={[{ required: true,whitespace: true,message: "请输入密码", }]}
            initialValue= '123456a'
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"              
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
              </Button>
          </Form.Item>
        </Spin>
      </Form>

      <div className="login-footer">
        <span>Copyright © 2019-2020 {globalStore.appTitle} All Rights Reserved.</span>
      </div>       
    </div>    
  );
};

export default observer(LoginPage);
