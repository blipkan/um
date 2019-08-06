import INITIAL_STATE from '../store/initialState';
import {ActionType} from '../actions';

const usercard = (state = INITIAL_STATE.usercard, action) => {

    switch (action.type) {

        case ActionType.USERROW_SELECT:
            return {...state, user: action.user};
        case ActionType.ADD_USER:
            return {...state, user: action.user, isFormOpened: true};
        case ActionType.EDIT_USER:
            return {...state, user: action.user, isFormOpened: true};
        case ActionType.CLOSE_USER_FORM:
            return {...state, user: action.user, isFormOpened: false};


        case ActionType.USER_READ_REQUEST:
            return {...state, isFetching: true};
        case ActionType.USER_READ_SUCCESS:
            return {...state, user: action.data.user, messages: action.data.messages};

        default:
            return state
    }

};

export default usercard