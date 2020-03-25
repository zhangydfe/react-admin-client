import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import './login.less';
import logo from './image/logo.jpg';

const Item = Form.Item;

/**
 * 登录应用组件
 */
export default class Login extends Component {

    handleFinish = (values) => {
        console.log("Success:", values)
    }

    handleFinishFailed = (values) => {
        console.log("Failed:", values)
    }

    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onFinish={this.handleFinish} className="login-form" initialValues={{username:"admin",password:"admin"}}>
                        <Item name="username" rules={[{required: true, message: 'Please input your Username!'}]} in>
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Item>
                        <Item name="password" rules={[{required: true, message: 'Please input your Password!'}]}>
                            {/*<Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"*/}
                                   {/*placeholder="Password"/>*/}
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                                            placeholder="Password"/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登 录</Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}