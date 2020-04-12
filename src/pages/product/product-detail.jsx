import React, {Component} from "react";
import {Card, List} from 'antd';
import {LeftCircleTwoTone} from '@ant-design/icons';

import img from '../../assets/images/logo.jpg'
import LinkButton from "../../components/link-button";
import {reqCategory} from '../../api'

const Item = List.Item;
/**
 * 产品详情应用组件
 */
export default class ProductDetail extends Component {

    async componentDidMount(){
        //请求分类名称
        //一次发送多个请求，只有都成功了，才正常处理
        const results = await Promise.all([reqCategory('1'),reqCategory('2')]);
        console.info(results);
    }

    render() {

        const {name,desc,price} = this.props.location.state;

        const title = (
            <span>
                <LinkButton>
                     <LeftCircleTwoTone onClick={() => this.props.history.goBack()}/>
                </LinkButton>
                <span style={{margin: '0 5px'}}>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item className='item'>
                        <span className='left'>商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品价格：</span>
                        <span>{price}元</span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品分类：</span>
                        <span>XXXXXXXXXXXXXXXX</span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品图片：</span>
                        <span>
                            <img src={img} alt='img'/>
                            <img src={img} alt='img'/>
                        </span>
                    </Item>
                    <Item className='item'>
                        <span className='left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html: '<h1 style="color:red">dangerouslySetInnerHTML</h1>'}}/>
                    </Item>
                </List>
            </Card>
        )
    }
}