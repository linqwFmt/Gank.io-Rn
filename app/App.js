/**
 * Created by Administrator on 2017/3/13.
 */
import  React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store'
import Root from './Root'
import rootReducer from "./reducers/index";
const store = configureStore(rootReducer);
import {
    Navigator,
} from 'react-native';
export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigator
                    initialRoute={{title:'root',component:Root}}
                    configureScene={(route,routeStack) => Navigator.SceneConfigs.FloatFromRight}
                    renderScene={(route,navigator)=>{
                    return (
                        <route.component {...route.params} title={route.title} navigator={navigator}/>
                    );
                }}/>
            </Provider>
        )
    }
}
