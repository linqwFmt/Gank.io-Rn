/**
 * Created by Administrator on 2017/3/15.
 */

import React, {
    Component
}from 'react'
import {
    View,
    StyleSheet,
    Text,
    ListView
}from 'react-native'
import {getDatas} from '../../utils/ApiProvider'
export default class ProgrammingItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 10,
            num: 1,
            datas: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
        }
    }
    componentWillMount() {
        this.getDatas();
    }

    getDatas = () => {
        getDatas(this.props.type, this.state.page, this.state.num).then(response => {
            let datas = this.state.datas;
            let urls = []
            if (this.state.num==1) {
            }else if (this.state.num>1){
                urls= datas;
            }
            response.map(r1 => {
                let img = {
                    title: r1.desc,
                    images: r1.images,
                    who: r1.who,
                    source:r1.source,
                }
                urls.push(img)
            })
            this.setState({
                datas: urls,
            })
        })
    }
    render() {
        return (
            <ListView dataSource={this.state.dataSource.cloneWithRows(this.state.datas)}
                      renderRow={this._renderRow.bind(this)}
            />
        )
    }

    _renderRow(rowData, sectionId, rowId) {
        if (rowData == null)return null
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{rowData.title}</Text>
                <Text style={styles.who}>{rowData.who}</Text>
                <Text style={styles.source}>{rowData.source}</Text>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {},
    title: {},
    source: {},
    who: {}
})