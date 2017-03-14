/**
 * Created by Administrator on 2017/3/13.
 */
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(rootReducer,initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}