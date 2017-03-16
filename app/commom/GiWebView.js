/**
 * Created by Administrator on 2017/3/16.
 */


import React, {Component} from 'react';
import {
    WebView,
    View,
    Dimensions,
    StyleSheet,
    Text,
    Navigator,
    BackAndroid
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {toastShort} from '../utils/ToastUtils'

export default class GiWebView extends Component {
    constructor(props) {
        super(props)
    }

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

    render() {
        return (
            <View style={{ flex:1,
        width:width,
        height:height}}>
                <WebView
                    style={styles.webview_style}
                    source={{uri:this.props.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    renderError={(errorDomain, errorCode, errorDesc)=>this._loadError(errorDomain, errorCode, errorDesc)}
                    onError={(errorDomain, errorCode, errorDesc)=>this._loadError(errorDomain, errorCode, errorDesc)}
                >
                </WebView>
            </View>
        )
    }

    _loadError(errorDomain, errorCode, errorDesc) {
        toastShort('errorDomain: ' + errorDomain + 'errorCode: ' + errorCode + 'errorDesc: ' + errorDesc);

    }
}
var styles = StyleSheet.create({
    webview_style: {
        flex: 1,
        width: width,
        height: height
    }
});