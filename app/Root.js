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
import {connect}from'react-redux'
 class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerLayout: this.props.drawerLayout,
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
    _renderDrawView = () =>{
        return (
            <DrawerView dispatch={this.props.dispatch} />
        );
    }
    _renderList() {
        if(this.state.drawerLayout.selectIndex==0){
            return(<Daily  />)
        }else {
            return(<Daily />)
        }
    }

}


function select(state) {
    return{
        drawerLayout: state.drawerLayout
    }
}
export default connect(select)(Root)



