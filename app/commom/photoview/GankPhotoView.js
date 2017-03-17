/**
 * Created by Administrator on 2017/3/14.
 */
import React, {Component, PropTypes}from 'react';
import {toastShort} from '../../utils/ToastUtils'
import PhotoView from './PhotoViewManager';

export default class GankPhotoView extends Component {
    //默认属性定义使用static propTypes
    render() {
        return (
            <PhotoView
                {...this.props}
            />
        );
    }
}
