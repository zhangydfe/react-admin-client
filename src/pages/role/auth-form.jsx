import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd';
import PropTyprs from 'prop-types';

import menuList from '../../config/menuConfig';

const Item = Form.Item;

/**
 * 应用组件
 */
export default class AuthForm extends Component {

    static propType = {
        role: PropTyprs.object
    };

    constructor(props) {
        super(props);
        const {menus} = this.props.role;
        this.state = {
            checkedKeys: menus
        }
    }


    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        const {node, selected} = info;
        if (selected) {
            this.setState({
                checkedKeys: [...this.state.checkedKeys, node.key]
            });
        } else {
            const checkedKeys = [...this.state.checkedKeys];
            const index = checkedKeys.indexOf(node.key);
            if (index > -1) {
                checkedKeys.splice(index, 1);
            }
            this.setState({
                checkedKeys
            });
        }
    };

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
        this.setState({
            checkedKeys
        });
    };

    getMenus = () => {
        return this.state.checkedKeys;
    }

    componentWillMount() {
        this.treeData = [
            {
                title: '平台权限',
                key: 'all',
                children: menuList
            },
        ];
    }

    componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys: menus
        })
    }

    render() {
        const {role} = this.props;
        const {checkedKeys} = this.state;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
        };

        return (
            <div>
                <Item {...formItemLayout} label='角色名称'>
                    <Input value={role.roleName} disabled></Input>
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                    treeData={this.treeData}
                />
            </div>
        )
    }
}


