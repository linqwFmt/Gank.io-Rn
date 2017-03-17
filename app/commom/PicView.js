/**
 * Created by Administrator on 2017/3/17.
 */
import React, {Component} from 'react';
import {
    Navigator,
    View,
    Text,
    BackAndroid
} from 'react-native';
import GankPhotoView from '../commom/photoview/GankPhotoView'
 import {toastShort} from '../utils/ToastUtils'
export default class PicView extends Component{
    componentDidMount() {
        const navigator = this.props.navigator;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true
            } else {
                return false
            }
        })
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress')
    }
    render(){

        return(
            <View style={{flex:1,justifyContent: 'center'}}>
                <GankPhotoView    style={{flex:1}}
                                data={this.props.data}/>
            </View>
        );
    }

}