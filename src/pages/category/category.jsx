import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import LinkButton from '../../components/link-button'
import AddForm from './add-form';
import UpdateForm from './update-form'

/**
 * 商品类型应用组件
 */
export default class Category extends Component {

    state = {
        loading: false,
        categorys: [],  //一级列表数据
        subCategorys: [],   //二级列表数据
        parentId: '0',
        parentName: '',
        showStatus: 0   //标识添加、修改弹框是否显示，0：都不显示，1：显示添加，2：显示修改
    }

    getColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width: '40%',
                render: (category) => (
                    <span>
                        <LinkButton onClick={() => {
                            this.showUpdateModal(category)
                        }}>修改分类</LinkButton>
                        {this.state.parentId === '0' ?
                            <LinkButton onClick={() => {
                                this.showSubCategorys(category)
                            }}>查看子列表</LinkButton> : null}
                    </span>
                ),
            }
        ];
    }

    showSubCategorys = (category) => {
        const subCategorys = [
            {
                id: '3',
                name: 'xxx电视',
                parentId: '1'
            },
            {
                id: '4',
                name: 'yyy电视',
                parentId: '1'
            }
        ];

        this.setState({     //setState不能获取最新的状态：因为setState是异步执行
            parentId: category.id,
            parentName: category.name,
        }, () => {//待状态更新后，重新render（）后执行
            //请求数据
            this.setState({
                subCategorys
            });
        });
    }

    showCategorys = () => {
        this.setState({
            parentId: '0',
            pathname: '',
            subCategorys: []
        });
    }

    /*
    * 异步获取列表数据
    * */
    getCategorys = () => {
        const categorys = [
            {
                id: '1',
                name: '电视',
                parentId: '0'
            },
            {
                id: '2',
                name: '冰箱',
                parentId: '0'
            }
        ];
        this.setState({
            categorys,
            parentId: '0',
            pathname: '',
            loading: false
        });
    }

    /*
    * 隐藏弹框
    * */
    handleCancel = () => {
        this.setState({
            showStatus: 0
        });
    }

    /**
     * 显示添加弹框
     */
    showAddModal = () => {
        this.setState({
            showStatus: 1
        });
    }

    /*
    * 添加分类
    * */
    addCategory = () => {
        const form = this.form.current;
        form.validateFields().then(
            values => {
                const {parentId, categoryName} = values;
                form.resetFields();
                console.info("parentId:{},categoryName：{}", parentId, categoryName);
                message.success("添加分类");
                this.setState({
                    showStatus: 0
                })
            }
        )
    }


    /*
    * 修改分类
    * */
    updateCategory = () => {
        const form = this.form.current;
        //validateFields()校验表单
        form.validateFields()
            .then(values => {
                    const {categoryName} = values;
                    message.success("updateCategory：" + this.category.id + categoryName);
                    this.setState({
                        showStatus: 0
                    });
                }
            ).catch(errorInfo => {
            console.info(errorInfo);
        });
    }

    /**
     * 显示修改弹框
     */
    showUpdateModal = (category) => {
        this.category = category;
        this.setState({
            showStatus: 2
        });
    }

    componentWillMount() {
        //初始化列
        this.getColumns();
    }

    componentDidMount() {
        //模拟请求数据
        this.getCategorys();
    }

    render() {
        const {categorys, subCategorys, loading, parentId, parentName, showStatus} = this.state;
        const category = this.category || {};

        let title = '';
        if ('0' === parentId) {
            title = "一级分类列表";
        } else {
            title = (
                <span>
                <LinkButton onClick={() => {
                    this.showCategorys()
                }}>一级分类列表</LinkButton>
                <span> -> {parentName}</span>
            </span>)
        }
        const extra = (
            <Button type="primary" icon={<PlusOutlined/>} onClick={this.showAddModal}>
                添加
            </Button>
        );

        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        bordered
                        rowKey='id'
                        loading={loading}
                        dataSource={parentId === '0' ? categorys : subCategorys}
                        columns={this.columns}
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            showQuickJumper: true
                        }}
                    />

                    <Modal
                        destroyOnClose={true}
                        title="添加分类"
                        visible={showStatus === 1 ? true : false}
                        onOk={this.addCategory}
                        onCancel={this.handleCancel}
                    >
                        <AddForm
                            categorys={categorys}
                            parentId={parentId}
                            setForm={(form) => {
                                this.form = form
                            }}
                        />
                    </Modal>

                    <Modal
                        // getContainer={false}
                        destroyOnClose={true}
                        title="修改分类"
                        visible={showStatus === 2 ? true : false}
                        onOk={this.updateCategory}
                        onCancel={this.handleCancel}
                    >
                        <UpdateForm
                            categoryName={category.name}
                            setForm={(form) => {
                                this.form = form
                            }}
                        />
                    </Modal>
                </Card>
            </div>
        )
    }
}