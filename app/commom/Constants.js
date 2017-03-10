/**
 * Created by Administrator on 2017/3/10.
 */

import {Dimensions, PixelRatio} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    pixel: 1.0 / PixelRatio.get(),
}

let defaultColor={
    html:'#EF6C02',
    extend:'#54647A',
    reset:'#039588',
    iOS:'#0a7bbe',
    android:'#388e3c'
}

export default {
    window:window,
    defaultColor:defaultColor
}

