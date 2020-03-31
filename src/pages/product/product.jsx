import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import ProductHome from './product-home';
import ProductAddUpdate from './product-add-update';
import ProductDetail from './product-detail';

/**
 * 商品管理应用组件
 */
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/product' component={ProductHome}/>
                <Route path='/product/addUpdate' component={ProductAddUpdate}/>
                <Route path='/product/detail' component={ProductDetail}/>
                <Redirect to='/product'/>
            </Switch>
        )
    }
}