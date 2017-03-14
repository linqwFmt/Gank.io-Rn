/**
 * Created by Administrator on 2017/3/13.
 */
import * as types from '../action/ActionTypes';
import Immutable from 'immutable';
const selectData={
    selectIndex:0
}

export default function getDrawerLayout(state=selectData, action) {
    switch (action.type) {
        case types.DRAWERLAYOUTREDUCER:
            return action.data;
        default:
            return state;
    }
}
