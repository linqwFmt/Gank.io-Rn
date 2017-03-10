/**
 * Created by Administrator on 2017/3/10.
 */

import {Dimensions, PixelRatio} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    pixel: 1.0 / PixelRatio.get(),
}

export default {
    window:window
}