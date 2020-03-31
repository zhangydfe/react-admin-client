import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Redirect} from 'react-router-dom';

import './login.less';
import logo from '../../assets/images/logo.jpg';
import storageUtils from '../../utils/storageUtils';

const Item = Form.Item;

/**
 * 登录应用组件
 */
export default class Login extends Component {

    /*
    async和await简化promise对象使用：不用在使用then（）来指定成功、失败的回调函数
    以同步编码（没有回调函数）方式实现异步流程
    在返回promise表达式的左侧写await：不想要promise，想要promise异步执行成功的value值
    await所占函数（最近）定义的左侧写async
    * */
    handleFinish = async (values) => {
        // const {username, password} = values;
        // const response = await reqLogin(username, password);
        // console.log(response);
        // if (response.status === 200){
        //     message.info(response.msg);
        //     //缓存用户
        //     const user = {username:"admin",password:"admin"};
        //     storageUtils.saveUser(user);
        //     //调转管理界面（不需要再退回登录界面）
        //     this.props.history.replace('/');
        // }else {
        //     message.info(response.msg);
        // }
        const user = {username: "admin", password: "admin"};
        storageUtils.saveUser(user);
        //调转管理界面（不需要再退回登录界面）
        this.props.history.replace('/');

    }


    render() {
        const user = storageUtils.getUser();
        if (user && user.username) {
            return <Redirect to='/'/>
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onFinish={this.handleFinish} className="login-form"
                          initialValues={{username: "admin", password: "admin"}}>
                        <Item name="username" rules={[{required: true, message: 'Please input your Username!'}]}>
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