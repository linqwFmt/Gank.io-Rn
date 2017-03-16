/**
 * Created by Administrator on 2017/3/15.
 */
import React, {Component} from "react";
import {View, StyleSheet, Text, ListView, TouchableOpacity,Navigator} from "react-native";
import {getDatas} from '../../utils/ApiProvider'
import {toastShort} from '../../utils/ToastUtils'
import GiWebView from '../GiWebView'


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
        this.getDatas(this.props.type);
    }

    componentWillReceiveProps(nextProps) {
        this.getDatas(nextProps.type);
    }


    getDatas = function(type) {
        getDatas(type, this.state.page, this.state.num).then(response => {
            let datas = this.state.datas;
            let urls = []
            if (this.state.num == 1) {
            } else if (this.state.num > 1) {
                urls = datas;
            }
            response.map(r1 => {
                let img = {
                    title: r1.desc,
                    images: r1.images,
                    who: r1.who,
                    source: r1.source,
                    url:r1.url
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
                      enableEmptySections={true}
            />
        )
    }

    _renderRow(rowData, sectionId, rowId) {
        if (rowData == null)return null
        let sourceType = this.getSourceType(rowData);
        return (
            <TouchableOpacity onPress={()=>this._nextHtml(rowData)}>
                <View style={styles.container}>
                    <Text style={styles.title}>{rowData.title}</Text>
                    <Text style={styles.who}>{rowData.who}</Text>
                    <Text style={[styles.source,sourceType]}>{rowData.source}</Text>
                </View>
            </TouchableOpacity>

        )
    }

    _nextHtml(rowData) {
        let {navigator}=this.props;
        if (navigator) {
            navigator.push(
                {
                    title: 'GiWebView',
                    component: GiWebView,
                    params:{
                        url:rowData.url
                    },
                }
            );
        }
    }

    getSourceType(rowData) {
        if (rowData.source == '微信分享') {
            return styles.weChatSource
        } else if (rowData.source == 'CSDN' || rowData.source == 'chrome') {
            return styles.csdnSource
        } else if (rowData.source == 'github' || rowData.source == 'web') {
            return styles.githubSource
        } else if (rowData.source == '文章') {
            return styles.ArticleSource
        } else {
            return styles.JianShuSource
        }
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderRadius: 1,
        borderColor: '#d3d3d3',
        margin: 5,
        alignItems: 'flex-start'
    },
    title: {
        color: "#1b1b1b",
        marginTop: 5
    },
    source: {
        color: "#fff",
        marginTop: 5,
        marginBottom: 10,
        padding: 3,
    },
    weChatSource: {
        backgroundColor: "#70dc3a"
    },
    csdnSource: {
        backgroundColor: "#c92d2d"
    },
    githubSource: {
        backgroundColor: '#000'
    },
    ArticleSource: {
        backgroundColor: "#870d4f"
    },
    JianShuSource: {
        backgroundColor: "#e9816d",
    },
    who: {
        color: "#aaa",
        marginTop: 5
    }
})