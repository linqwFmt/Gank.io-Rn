/**
 * Created by Administrator on 2017/3/10.
 */


import Toast from 'react-native-root-toast'

let toast;
export const toastShort=(content)=>{
    if (toast!==undefined){
        Toast.hide(toast);
    }
    toast=Toast.show(content.toString(),{
        duration:Toast.durations.SHORT,
        position:Toast.positions.CENTER,
        shadow:true,
        animation:true,
        hideOnPress:true,
        delay:0
    })
}