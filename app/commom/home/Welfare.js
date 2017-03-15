/**
 * Created by Administrator on 2017/3/14.
 */
import React, {Component, PropTypes} from 'react';
import {toastShort} from '../../utils/ToastUtils'

import {
    StyleSheet,
    Text,
    View,
    ListView,
    NativeModules,
    requireNativeComponent
} from 'react-native';

import {getDatas} from '../../utils/ApiProvider'
import RcWaterfallView from '../welfare/RCTWelfareView';
export default class Welfare extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: '福利',
            page: 10,
            num: 1,
            datas: ''
        }
        this._onLoadMore = this._onLoadMore.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentWillMount() {
        this.getWelfare();
    }

    getWelfare = () => {
        getDatas(this.state.type, this.state.page, this.state.num).then(response => {
            let datas = this.state.datas;
            let urls = []
            if (this.state.num==1) {
            }else if (this.state.num>1){
                urls= JSON.parse(datas);
            }
            response.map(r1 => {
                let img = {
                    url: r1.url,
                }
                urls.push(img)
            })
            this.setState({
                datas: JSON.stringify(urls),
            })
        })
    }

    render() {
        return (
            <RcWaterfallView style={styles.container}
                             data={this.state.datas}
                             onLoadMore={this._onLoadMore}
                             onRefresh={this._onRefresh}
            >
            </RcWaterfallView>
        )
    }

    _onLoadMore() {
        this.setState({
            num: ++this.state.num,
        })
        this.getWelfare()
    }

    _onRefresh() {
        this.setState({
            num: 1,
        })
        this.getWelfare()
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

