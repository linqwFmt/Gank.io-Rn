/**
 * Created by Administrator on 2017/3/13.
 */
import * as types from '../action/ActionTypes';
export default function DrawerLayout(state = 10, action) {
    switch (action.type) {
        case types.DRAWERLAYOUTREDUCER:
            return state;
        default:
            return state;
    }
}
