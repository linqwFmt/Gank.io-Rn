/**
 * Created by Administrator on 2017/3/10.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';
import {getGanHuoDatasToDay,getGankHuoDatesHistory} from './utils/ApiProvider'
import Head from '../app/commom/home/Head'
import {toastShort} from './utils/ToastUtils'
export default class Root extends Component {

    constructor(props){
        super(props);
        this.state={
            ganhuo:[],
            dataSource:new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!==r2
            }),
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
            datas.push(response.福利);
            console.log(datas);
            this.setState({
                ganhuo:datas
            })
        })
    }
    render(){
        return(
            <ListView  dataSource={this.state.dataSource.cloneWithRows(this.state.ganhuo)}
                      renderRow={this._renderRow.bind(this)}
                       renderHeader={this._renderHeader.bind(this)}
                      />
        )
    };
    _renderRow(rowData,sectionId,rowId){
        return(<Text>Body</Text>)
    }
    _renderHeader(){
        if (this.state.ganhuo!=null&&this.state.ganhuo.length>0){
            return(<Head url={this.state.ganhuo[4][0].url}/>)
        }else {
            return null
        }
    }
}