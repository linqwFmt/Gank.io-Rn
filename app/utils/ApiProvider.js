/**
 * Created by Administrator on 2017/3/10.
 */

import {
    NetInfo
}from 'react-native'
// import toastShort from './ToastUtils'
const  GanHuoBaseUrl='http://www.gank.io/api/'

/**
 * 获取发不过干货的日期
 */
const GankHuoDates='http://www.gank.io/api/day/history'

/**
 * http://gank.io/api/data/福利/10/1
 * <p>
 * 数据类型： 福利 | Android | iOS | 休息视频 | 拓展资源 | 前端 | all
 */
const GankData=GanHuoBaseUrl + "data/";

/**
 * 每日数据： http://gank.io/api/day/年/月/日
 */
const GanHuoDataByDay = GanHuoBaseUrl + "day/";

/**
 * http://www.gank.io/api/day/2017/3/09
 * 获取某天的干货
 */

export function getGankHuoDatesHistory() {
    return getJsonData(GankHuoDates);
}
export function getDatas(type,page,num) {
    return getJsonData(GankData+type+"/"+page+"/"+num);
}

export function getGanHuoDatasToDay() {
     return getGankHuoDatesHistory()
         .then(response=>{
             //数据变化日月中间两个斜杠替换
             return   response[0].replace('-','/').replace('-','/');
         })
         .then(response=>{
         return getGanHuoDatas(response);
     })
}


export function getGanHuoDatas(date) {
   return getJsonData(GanHuoDataByDay+date);
}

function  getJsonData(url) {
    return NetInfo
        .isConnected
        .fetch().then((isConnected)=>{
            // toastShort('请检查当前网络')
            return isConnected
        }).then(isConnected =>{
            if(!isConnected){
               return{
                   code:48,
                   errorMessage:'请检查当前网络'
               }
            }else {
                return fetch(url,{
                    method:'GET'
                }).then(response=>{
                   return response.json()
                })
                    .then((response)=>{
                    //网络请求成功
                    if(response.error==false){
                        return response.results;
                    }else{
                        //处理网络失败的数据,也可以返回工具response返回相应code和errorMeeage
                    }
                }).catch(err=>{
                    return{
                        code:48,
                        errorMessage:'网络异常'
                    }
                })
            }
        })

}