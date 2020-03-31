import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'antd';
import {createFromIconfontCN} from '@ant-design/icons';

import './index.less'
import logo from '../../assets/images/logo.jpg';
import menuList from '../../config/menuConfig';

const {SubMenu} = Menu;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

/**
 * 左侧导航栏应用组件
 */
class LeftNav extends Component {

    /*
    * 根据menu的数据生成对应的标签
    * map+ 递归调用
    * */
    getMenuNodes_map = (menuList) => {
        //获取当前请求的路径this.props.location.pathname
        const path = this.props.location.pathname;

        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <IconFont type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                );
            } else {
                //查找一个与当前请求路径匹配的子item
                const cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) {
                    this.openKey = item.key;
                }

                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <IconFont type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                );
            }
        });
    }

    /*
    * 根据menu的数据生成对应的标签
    * reduce+ 递归调用
    * */
    getMenuNodes = (menuList) => {
        //获取当前请求的路径this.props.location.pathname
        const path = this.props.location.pathname;

        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <IconFont type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ));
            } else {
                //查找一个与当前请求路径匹配的子item
                const cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) {
                    this.openKey = item.key;
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <IconFont type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>));
            }
            return pre;
        }, []);
    }

    /**
     * 第一次render（）之前调用一次
     * 为第一个render（）准备数据（必须同步的）
     * */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        //获取当前请求的路径this.props.location.pathname
        const path = this.props.location.pathname;
        const openKey = this.openKey;

        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>管理后台</h1>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

/**
 * withRouter:高阶组件
 * 包装非路由组件，返回一个新路由组件
 * 新组件向非路由组件传递3个属性：history、location、match
 */
export default withRouter(LeftNav);
