import INITIAL_STATE from '../store/initialState';
import {ActionType} from '../actions';

const userlist = (state = INITIAL_STATE.userlist, action) => {

    switch (action.type) {

        case ActionType.USERLIST_REQUEST:
            return {...state, isFetching: true};
        case ActionType.USERLIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.data.content,
                query: action.req.query,
                sort: action.req.sort
            };


        case ActionType.USER_UPDATE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, {type: "success", key: "msg.userUpdateOk", args: action.data}]
            };

        case ActionType.USER_DELETE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, {type: "success", key: "msg.userDeleteOk", args: action.req}]
            };


        case ActionType.USERROW_SELECT:
            return {...state, selectedId: action.user.id};
        case ActionType.ADD_USER:
            return state;

        case ActionType.LANG_SWITCH:
            return {...state, isFetching: action.code};


        case ActionType.DISMISS_MESSAGE:
            //const ind = state.messages.indexOf(action.msg)
            return {...state, messages: state.messages.filter(m => m !== action.msg)};


        default:
            return state
    }

};

export default userlist
