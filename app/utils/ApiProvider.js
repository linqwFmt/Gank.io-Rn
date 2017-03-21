/**
 * Created by Administrator on 2017/3/10.
 */

import {
    NetInfo
}from 'react-native'
import Stroage from './Storage'
import {toastShort} from './ToastUtils'
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
            return isConnected
        }).then(isConnected =>{
            if(!isConnected){
                return Stroage.get(url).then(json=>{
                    if(json==null||json==''){
                        return{
                            code:48,
                            errorMessage:'网络异常'
                        }
                    }else {
                         return JSON.parse(json)
                    }
                })
            }else {
                return fetch(url,{
                    method:'GET'
                }).then(response=>{

                    return response.json()
                })
                    .then((response)=>{

                        //网络请求成功
                    if(response.error==false){
                        //由于目前都是get请求的列表数据展示就每一个的存储
                        Stroage.save(url,response.results)
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