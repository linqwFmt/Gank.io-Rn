/**
 * Created by Administrator on 2017/3/10.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    DrawerLayoutAndroid
} from 'react-native';

import {toastShort} from './utils/ToastUtils'
import DrawerView from './commom/DrawerView'
import Daily from './commom/home/Daily'
export default class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectIndex: 0,
        }
    }

    render() {
        return (
                <DrawerLayoutAndroid
                    drawerWidth={170}
                    drawerPosition={DrawerLayoutAndroid.positions.right}
                    renderNavigationView={this._renderDrawView}>
                    {this._renderList()}
                </DrawerLayoutAndroid>
        )
    }
    _renderDrawView() {
        return (
            <DrawerView/>
        );
    }
    _renderList() {
        if(this.state.selectIndex==0){
            return(<Daily/>)
        }else {
            return(<Daily/>)
        }
    }
}


