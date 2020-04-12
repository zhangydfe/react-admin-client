/*
* 所有接口函数
* */
import ajax from './ajax';
// import jsonp from 'jsonp';
// import {message} from 'antd'

const hr = '/system/hr';
export const reqLogin = (username, password) => ajax(hr + '/post', {username, password}, 'POST');

/**
 * jsonp请求函数
 */
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        //ak是百度天气开发者id
        // const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        // jsonp(url, {}, (error, data) => {
        //     if (!error && data.status === 'success') {
        //         //取出需要数据
        //         const {dayPictureUrl, weather} = data.result[0].weather_data[0];
        //         resolve({dayPictureUrl, weather})
        //     } else {
        //          message.error("获取天气信息失败")
        //     }
        // });

        //假数据
        const data = {dayPictureUrl:'http://api.map.baidu.com/images/weather/day/qing.png', weather:'晴'}
        resolve(data);
    });
}

/**
 * 请求函数
 */
export const reqCategory = (id) => {}
