/**
 * Created by Administrator on 2017/3/13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity
} from 'react-native';
import * as Type from '../action/ActionTypes';
export default class DrawItem extends Component{

    constructor(props){
        super(props)
        this.state={
            label:this.props.label,
            index:this.props.index
        }
        this._onClick=this._onClick.bind(this)
    }

    _onClick(){
        let {dispatch}=this.props
        dispatch(this._getIndex())
    }

   _getIndex(){
        return{
            type:Type.DRAWERLAYOUTREDUCER,
            data:{
                selectIndex:this.state.index
            }
        }
   }

    render(){
      return(
          <TouchableOpacity onPress={this._onClick}>
          <View style={styles.container}>
              {this._renderImage()}
              <Text style={styles.label}>{this.state.label}</Text>
          </View>
          </TouchableOpacity>
      )
    }

    _renderImage(){
        if(this.state.index==0){
            return(
                <Image style={styles.image} source={require('../../img/ic_daily.png')}/>
            )
        }else if(this.state.index==1){
            return(
                <Image style={styles.image} source={require('../../img/ic_welfare.png')}/>
            )
        }else if(this.state.index==2){
            return(
                <Image style={styles.image} source={require('../../img/ic_android.png')}/>
            )
        }else if(this.state.index==3){
            return(
                <Image style={styles.image} source={require('../../img/ic_ios.png')}/>
            )
        }else if(this.state.index==4){
            return(
                <Image style={styles.image} source={require('../../img/ic_js.png')}/>
            )
        }else if(this.state.index==5){
            return(
                <Image style={styles.image} source={require('../../img/ic_video.png')}/>
            )
        }else{
            return(
                <Image style={styles.image} source={require('../../img/ic_resources.png')}/>
            )
        }
    }
}

var styles=StyleSheet.create({
   container:{
       flexDirection:'row',
       paddingLeft:20,
       paddingRight:20,
       marginTop:10,
       marginBottom:10
   },
    image:{
        width:20,
        height:20
    },
    label:{
       color:'#232323',
        marginLeft:20
    }
});