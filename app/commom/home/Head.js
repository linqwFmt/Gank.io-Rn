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
import Common from '../../commom/Constants';
export default  class HomePageHead extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>福利</Text>
                <View style={{flex:1,backgroundColor:'#A8A8A8',height:1}}></View>
                <Image style={styles.image} source={{uri:this.props.url}}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    image: {
        height:300,
        margin:10
    },
    text:{
        color:'#FF83FA',
        borderColor:'#A8A8A8',
        padding:10,
        fontSize:18
    },
    container:{
        flex:1,
        flexDirection:'column',
        borderColor:'#A8A8A8',
        borderRadius:1,
        margin:10,
        borderWidth:1,
    }
})