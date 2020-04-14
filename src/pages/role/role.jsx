import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd'

import {PAGE_SIZE} from "../../utils/constants";
import AddForm from "./add-form";
import AuthForm from "./auth-form";
import {formateDate} from '../../utils/dateUtils';
import storageUtils from "../../utils/storageUtils";

/**
 * 角色管理应用组件
 */
export default class Role extends Component {

    constructor(props) {
        super(props)
        this.state = {
            roles: [],
            role: {},
            loading: false,
            isShowAdd: false,
            isShowAuth: false
        }
        this.auth = React.createRef();
    }

    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                render: (createTime) => {
                    return formateDate(createTime)
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authTime',
                render: formateDate

            },
            {
                title: '授权人',
                dataIndex: 'authName',
            }
        ];
    }
    getRoles = () => {
        const roles = [
            {
                id: '1',
                roleName: '管理员',
                createTime: 1586671046367,
                authTime: 1586671046367,
                authName: 'admin',
                menus: [
                    "/home",
                    "/role",
                    "/charts/bar"
                ]
            },
            {
                id: '2',
                roleName: '测试',
                createTime: 1586671046367,
                authTime: 1586671046367,
                authName: 'admin',
                menus: [
                    "/home",
                ]
            }
        ];
        this.setState({
            roles,
            loading: false
        });
    }
    /*
   * 添加角色
   * */
    addRole = () => {
        const form = this.form.current;
        form.validateFields().then(
            values => {
                const {roleName} = values;
                form.resetFields();
                console.info("roleName：{}", roleName);
                message.success("添加角色成功");
                this.setState({
                    isShowAdd: false
                })
            }
        ).catch(
            errorInfo => {
                console.info(errorInfo);
            }
        )
    }

    //设置行属性
    onRow = (role) => {
        return {
            // 点击行
            onClick: event => {
                console.info(role)
                this.setState({role});
            },
            onDoubleClick: event => {
            },
            onContextMenu: event => {
            },
            // 鼠标移入行
            onMouseEnter: event => {
            },
            onMouseLeave: event => {
            },
        };
    }

    /**
     * 显示添加弹框
     */
    showAddModal = () => {
        this.setState({
            isShowAdd: true
        });
    }

    /**
     * 显示修改弹框
     */
    showUpdateModal = () => {
        this.setState({
            isShowAuth: true
        });
    }

    /**
     * 设置角色权限
     */
    updateRole = () => {
        const auth = this.auth.current;
        const menus = this.auth.current.getMenus();
        console.info('menus', menus);

        //如果修改了自己角色的权限，强制退出
        if (false) {
            storageUtils.removeUser();
            this.props.history.replace('/login');
        } else {
            this.setState({
                roles: [...this.state.roles],
                isShowAuth: false
            })
        }
    }


    componentWillMount() {
        //初始化列
        this.initColumns();
    }

    componentDidMount() {
        //模拟请求数据
        this.getRoles();
    }

    render() {
        const {roles, role, loading, isShowAdd, isShowAuth} = this.state;
        const title = (<span>
                <Button type='primary' onClick={this.showAddModal}>创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' disabled={!role.id} onClick={this.showUpdateModal}>设置角色权限</Button>
            </span>)

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='id'
                    loading={loading}
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showSizeChanger: true,
                        showQuickJumper: true
                    }}
                    rowSelection={{type: 'radio', selectedRowKeys: [role.id]}}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.form.current.resetFields();
                        this.setState({isShowAdd: false})
                    }}
                >
                    <AddForm
                        setForm={(form) => {
                            this.form = form
                        }}
                    />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({isShowAuth: false});
                    }}
                >
                    <AuthForm ref={this.auth} role={role}/>
                </Modal>

            </Card>

        )
    }
}