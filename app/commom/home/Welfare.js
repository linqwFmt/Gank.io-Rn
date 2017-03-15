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
import ReactWaterfallView from '../welfare/RCTWelfareView';
export default class Welfare extends Component {

    constructor(props) {
        super(props)
        this.state = {
            type: '福利',
            page: 10,
            num: 1,
            datas: ''
        }
    }

    componentWillMount() {
        this.getWelfare();
    }

    getWelfare = () => {
        getDatas(this.state.type, this.state.page, this.state.num).then(response => {
            console.log(response)
            let urls = []
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
            <ReactWaterfallView style={styles.container}
                                data={this.state.datas}
                                onChange={this._onChange}
            >

            </ReactWaterfallView>
        )
    }

    _onChange= (event: Event) => {
        console.log('ss')
    };

    _onLoadMore() {
      console.log('_onLoadMore')
    }

    _onRefresh() {
        console.log('_onRefresh')
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

