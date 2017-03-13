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
import {getGanHuoDatasToDay,getGankHuoDatesHistory} from './utils/ApiProvider'
import Head from '../app/commom/home/Head'
import ContentItem from '../app/commom/home/Content'
import {toastShort} from './utils/ToastUtils'
import DrawerView from './commom/DrawerView'

export default class Root extends Component {

    constructor(props){
        super(props);
        this.state={
            ganhuo:[],
            fuli:null,
            dataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!==r2
            }),
            selectIndex:0
        }
    }
    componentWillMount() {
        this.getGangHuo();
    }
    getGangHuo=()=>{
        getGanHuoDatasToDay().then(response=>{
            let  datas=[];
            datas.push(response.Android);
            datas.push(response.iOS);
            datas.push(response.休息视频);
            datas.push(response.拓展资源);
            console.log(datas);
            this.setState({
                ganhuo:datas,
                fuli: response.福利
        })
        })
    }
    render(){


        return(
            <DrawerLayoutAndroid
                drawerWidth={170}
                drawerPosition={DrawerLayoutAndroid.positions.right}
                renderNavigationView={this._renderDrawView}>
                {this._renderList()}
            </DrawerLayoutAndroid>
        )
    }
    _renderDrawView(){
       return(
          <DrawerView/>
       );
    }
    _renderList(){
        return(
            <ListView   dataSource={this.state.dataSource.cloneWithRows(this.state.ganhuo)}
                       renderRow={this._renderRow.bind(this)}
                       renderHeader={this._renderHeader.bind(this)}
            />
        )
    }
    _renderRow(rowData,sectionId,rowId){
        return(<ContentItem datas={rowData}/>)
    }
    _renderHeader(){
        if (this.state.ganhuo!=null&&this.state.ganhuo.length>0){
            return(<Head url={this.state.fuli[0].url}/>)
        }else {
            return null
        }
    }
}