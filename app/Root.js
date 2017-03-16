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
import ProgrammingItem from './commom/home/Programming'
import Welfare from './commom/home/Welfare'
import {connect}from'react-redux'
class Root extends Component {

    constructor(props) {
        super(props);
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

    _renderDrawView = () => {
        return (
            <DrawerView dispatch={this.props.dispatch}/>
        );
    }

    _renderList() {
        if (this.props.selectIndex == 0) {
            return (<Daily  {...this.props}/>)
        } else if (this.props.selectIndex == 1) {
            return (<Welfare/>)
        } else if(this.props.selectIndex==2){
            return(<ProgrammingItem  type="Android" {...this.props}/>)
        } else if(this.props.selectIndex==3){
            return(<ProgrammingItem type="iOS" {...this.props}/>)
        } else if(this.props.selectIndex==4){
            return(<ProgrammingItem  type="前端" {...this.props}/>)
        }else if (this.props.selectIndex == 5) {
            return (<ProgrammingItem  type="休息视频" {...this.props}/>)
        } else if (this.props.selectIndex == 6) {
            return (<ProgrammingItem  type="拓展资源" {...this.props}/>)
        }else {
            return (<Welfare/>)
        }
    }

}


function select(state) {
    return {
        selectIndex: state.drawerLayout.selectIndex
    }
}
export default connect(select)(Root)



