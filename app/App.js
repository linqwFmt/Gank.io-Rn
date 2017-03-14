/**
 * Created by Administrator on 2017/3/13.
 */
import  React,{Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store'
import Root from './Root'
import rootReducer from "./reducers/index";
const store=configureStore(rootReducer);

export default class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Root/>
            </Provider>
        )
    }
}
