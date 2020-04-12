import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';

import './index.less'
import {formateDate} from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeather} from "../../api";
import menuList from '../../config/menuConfig'
import LinkButton from '../../components/link-button'

/**
 * 头部应用组件
 */
class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),   //当前时间（字符串）
        dayPictureUrl: '',  //天气图片地址
        weather: ''//天气
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({currentTime})
        }, 1000);
    }

    getWeather = async () => {
        const {dayPictureUrl, weather} = await reqWeather('上海');
        this.setState({dayPictureUrl, weather});
    }

    getTitle = () => {
        //得到当前路径
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                if (cItem) {
                    title = cItem.title;
                }
            }
        });
        return title;
    }

    getUserName = () => {
        const user = storageUtils.getUser();
        let username = '';
        if (user) {
            username = user.username;
        }
        return username;
    }

    handleClick = () => {
        Modal.confirm({
            title: 'Do you Want to logout?',
            icon: <ExclamationCircleOutlined/>,
            content: '确定退出吗？',
            onOk: () => {
                //删除数据
                // storageUtils.removeUser();
                //跳转到登录页面
                // this.props.history.replace('/login');
            }
        });
    }

    /**
     * 第一次render（）之后请求
     * 一般在此执行异步操作：发ajax请求或启动定时器
     */
    componentDidMount() {
        this.getTime();
        this.getWeather();
    }

    //当前组件卸载之前
    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {

        const {currentTime, dayPictureUrl, weather} = this.state;
        const username = this.getUserName();
        const title = this.getTitle();

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.handleClick}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt={weather}/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);