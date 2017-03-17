/**
 * Created by Administrator on 2017/3/14.
 */
import React, {Component, PropTypes}from 'react';
import {toastShort} from '../../utils/ToastUtils'
import RCTWaterfallView from './RCTWelfareViewManager';

export default class RcWaterfallView extends Component {
    //默认属性定义使用static propTypes
    static propTypes = {
        onLoadMore: PropTypes.func,
        onRefresh:PropTypes.func,
        onClickImage:PropTypes.func
    };

    render() {
        return (
            <RCTWaterfallView
                {...this.props}
                onChange={this._onChange}z
            />
        );
    }

    _onChange = (event: Event) => {
        if(event.nativeEvent.msg=='onLoadMore'){
            this.props.onLoadMore(event.nativeEvent.msg);
        }else{
            this.props.onClickImage(event.nativeEvent.msg);
        }
    };
}
