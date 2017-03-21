/**
 * Created by Administrator on 2017/3/17.
 */

import React from 'react-native';

const {AsyncStorage} = React;

//存储数据的类，通过url,json的键值对去存储
 class DeviceStorage {
       static async save(key,value){
           let noNullValue=value;
           if (!noNullValue){
               noNullValue='Null'
           }
           try{
               AsyncStorage.setItem(key,JSON.stringify(noNullValue));
           }catch (error){
               console.log(error)
           }
       }
      static async get(key){
           try{
               let value= await AsyncStorage.getItem(key);
               if (value!=null||value!='Null'){
                   return value
               }else {
                   return null
               }
           }catch (error){
               console.log(error)
           }
       }


}
export default DeviceStorage;