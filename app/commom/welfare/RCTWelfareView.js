/**
 * Created by Administrator on 2017/3/14.
 */
import {PropTypes} from 'react';
import {requireNativeComponent, View,} from 'react-native';
var ReactWaterfallView = {
    name: 'ReactWaterfallView',
    propTypes: {
        data:PropTypes.string,
        ...View.propTypes,//添加默认View的属性，否则会导致各种属性未定义错误
    },
};
module.exports = requireNativeComponent('ReactWaterfallView', ReactWaterfallView);