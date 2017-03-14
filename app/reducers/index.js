/**
 * Created by Administrator on 2017/3/13.
 */
import {combineReducers} from 'redux';
import drawerLayout from './DrawerLayoutReducers'
const rootReducer = combineReducers({
    drawerLayout,
});

export default rootReducer;