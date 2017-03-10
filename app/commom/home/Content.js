/**
 * Created by Administrator on 2017/3/10.
 */

import React, {
    Component
}from 'react'
import {
    Image,
    View,
    StyleSheet,
    Text
}from 'react-native'
import defalutColor from '../Constants'
export default class ContentItem extends Component {

    render() {
        let datas = this.props.datas;
        let titleStyle=this._titleStyle();
        return (
            <View style={styles.container}>
                <Text style={[styles.title,titleStyle]}>{datas[0].type}</Text>
                <View style={{flex:1,backgroundColor:'#A8A8A8',height:1}}></View>
                {this._listItem()}
            </View>
        )
    }

    _titleStyle(){
        let datas = this.props.datas;
        if(datas[0].type=='Android')
            return styles.androidTitle
        else if (datas[0].type=='iOS')
            return styles.iOSTitle
        else if (datas[0].type=='休息视频')
            return styles.restTitle
        else if (datas[0].type=='拓展资源')
            return styles.extentTitle
        else if (datas[0].type=='前端')
            return styles.htmlTitle
    }

    _listItem() {
        let mViews = [];
        for (let i = 0; i < this.props.datas.length; i++)
            mViews.push(this._article(this.props.datas[i].desc, this.props.datas[i].who))
        return (
            mViews
        );
    }

    _article(desc, article) {
        return (
            <View style={styles.articleContainer}>
                <Text style={styles.desc}>{desc}</Text>
                <Text style={styles.article}>   via. {article}</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#A8A8A8',
        borderRadius: 1,
        margin: 10,
        borderWidth: 1,
    },
    title: {
        borderColor: '#A8A8A8',
        padding: 10,
        fontSize: 18
    },
    androidTitle:{
        color:defalutColor.android
    },
    iOSTitle:{
        color:defalutColor.iOS
    },
    restTitle:{
    color:defalutColor.reset
   },
    extentTitle:{
        color:defalutColor.extend
    },
    htmlTitle:{
        color:defalutColor.html
    },
    desc: {
         color:'#161615'
    },
    article:{
         color:'#c0c0bd'
    },
    articleContainer:{
        flex:1,
        flexDirection:'row',
        margin:10
    }
})