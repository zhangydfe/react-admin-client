import axios from 'axios'
import {message} from 'antd'

/*
异步请求
封装axios库
函数返回值是promise对象
 */
export default function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let promise;
        //1、执行异步ajax请求
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            });
        } else {
            promise = axios.post(url, data);
        }
        //2.成功，调用resolve（value）
        //2.失败，不调用reject（value），而是提示异常信息
        promise.then(response => {
            resolve(response.data);
        }).catch(error => {
            message.error('请求错误：' + error.message)
        })
    });
}
