/**
 * Created by Administrator on 2017/3/13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import DrawItem from './DrawerItem'
let drawItems=[{title:'每日精彩'},{title:'福利'},{title:'Android'},{title:'iOS'},{title:'前端'},{title:'休息视频'},{title:'扩展资源'}]
export default class DrawerView extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let drawItemViews=[];
        for(let i=0;i<drawItems.length;i++){
                drawItemViews.push(
                   <DrawItem label={drawItems[i].title} index={i} />
                )
        }
        return(
            <View>
                {drawItemViews}
            </View>

        )
    }
}