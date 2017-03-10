/**
 * Created by Administrator on 2017/3/10.
 */

import React, {
    Component
}from 'react'
import {
    Image,
    StyleSheet
}from 'react-native'
import Tags from './Tags'
/**
 * 带图片的一个列表item
 */
export default  class AllListItem extends Component {

    render() {
        return (
          <View style={ styles.container}>
              <Image style={styles.image}>
              </Image>
              <View style={styles.rightContainer}>
                  <Text style={styles.content}></Text>
                  <View>
                      <Tags/>
                      <Text style={styles.time}></Text>
                  </View>
              </View>
          </View>
        );
    }
}
var styles=StyleSheet.create({
     container: {},
     image:{},
     content:{},
     rightContainer:{},
     time:{}
})