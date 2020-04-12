import React, {Component} from 'react';
import {Card, Select, Button, Input, Table, message} from 'antd';
import {PlusOutlined} from "@ant-design/icons";

import './product.less';
import LinkButton from "../../components/link-button";
import {PAGE_SIZE} from '../../utils/constants';

const {Option} = Select;

/**
 * 产品主页应用组件
 */
export default class ProductHome extends Component {

    state = {
        products: [],
        total: 0,
        searchType: 'productName',
        searchName: ''
    }

    updateStatus = (product) => {
        const {status, id} = product;
        message.success(id + '-----' + status);
    }

    /**
     * 初始化列表数据
     */
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                width: '40%',
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: price => '￥' + price
            },
            {
                width: 100,
                title: '状态',
                render: (product) => {
                    return (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => this.updateStatus(product)}
                            >
                                {product.status === 1 ? '下架' : '上架'}</Button>
                            <span>{product.status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            {/*将 product对象使用state传递给目标组件*/}
                            <LinkButton type="primary"
                                        onClick={() => this.props.history.push('/product/detail', product)}>详情</LinkButton>
                            <LinkButton type="primary"
                                        onClick={() => this.props.history.push('/product/addUpdate', product)}>修改</LinkButton>
                        </span>
                    )
                }
            }
        ];
    }

    /**
     * 获取产品列表
     */
    getProducts = () => {
        const products = [
            {
                id: '1',
                name: '电视',
                desc: '列数据在数据项中对应的路径，支持通过数组查询嵌套路径。列数据在数据项中对应的路径，支持通过数组查询嵌套路径。列数据在数据项中对应的路径，支持通过数组查询嵌套路径',
                price: 200,
                status: 1
            },
            {
                id: '2',
                name: '冰箱',
                desc: 'xxxxxxxxxxxxx',
                price: 300,
                status: 0
            }
        ];
        this.setState({
            products,
            total: products.length
        });
    }

    /**
     * 搜索
     */
    onSearch = () => {
        const {searchType, searchName} = this.state;
        message.success(searchType + '-----' + searchName);
    }

    onPageChange = (pageNum) => {
        console.info('Page Change:' + pageNum);
    }

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        //模拟请求数据
        this.getProducts();
    }

    render() {
        const {products, searchType, total} = this.state;

        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{width: 150}}
                    onChange={value => this.setState({searchType: value})}
                >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{width: 200, margin: '0 15px'}}
                    onChange={event => this.setState({searchName: event.target.value})}
                />
                <Button
                    type='primary'
                    onClick={this.onSearch}
                >搜索</Button>
            </span>
        );
        const extra = (
            <Button
                type='primary'
                icon={<PlusOutlined/>}
                onClick={()=> this.props.history.push('/product/addUpdate')}
            >
                添加
            </Button>
        );

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='id'
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        onChange: this.onPageChange
                    }}
                />
            </Card>
        )
    }
}