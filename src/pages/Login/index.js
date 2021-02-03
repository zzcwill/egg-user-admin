// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { Form, Input, Checkbox, Button, message } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { observer } from 'mobx-react';

import React from "react";
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getToken, setToken } from "@/services/config";

import { login, getInfo } from "@/api/common";
import { appStores } from '@/stores';
import './style.less';

const LoginPage = () => {
  const history = useHistory();
  const { globalStore } = appStores();

  // const handleSubmit = (values) => {
  //   console.log('登录信息 ', values);
  //   message.success('登录成功，即将跳转...', 2);
  //   setTimeout(() => {
  //     history.push('/');
  //   }, 2000);
  // };

  const handleLogin = (loginData) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    login(loginData)
      .then(() => {
        history.push('/home');
      })
  };

  const autoJump = () => {
    let token = getToken();
    if (token) {
      history.push('/dashboard');
    }
  }
  autoJump()

  const handleSubmit = async (values) => {
    const { userName, password } = values;
    let loginData = {
      userName,
      password
    }
    // 登录完成后 发送请求 调用接口获取用户信息
    let logindata = await login(loginData)

    if(loginData.code === 10000) {
      history.push('/home');
    }

    // 对所有表单字段进行检验
    // form.validateFields((err, values) => {
    //   // 检验成功
    //   if (!err) {
    //     const { userName, password } = values;
    //     let loginData = {
    //       userName,
    //       password
    //     }
    //     handleLogin(loginData);
    //   } else {
    //     console.log("检验失败!");
    //   }
    // });
  };  

  return (  
    // <div className="page-login">
    //   <Form onFinish={handleSubmit} className="login-form">
    //     <div className="login-title">欢迎登录 {globalStore.appTitle}</div>
        // <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
        //   <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        // </Form.Item>
        // <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
        //   <Input
        //     prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        //     type="password"
        //     placeholder="密码"
        //   />
        // </Form.Item>
    //     <Form.Item name="remember" valuePropName="checked" initialValue>
    //       <Checkbox>记住我</Checkbox>
    //       <a className="login-form-forgot" href="">
    //         忘记密码
    //       </a>
    //       <Button type="primary" htmlType="submit" className="login-form-button">
    //         登录
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </div>
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
