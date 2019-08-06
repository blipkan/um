import Immutable from 'immutable';
import {msgErr} from '../util/confirm';

const DUMMY = 1;
const PREF_DUMMY_URL = './data/dummy/users_';
const getFetchMethod = (m) => (DUMMY) ? "GET" : m;

export const ActionType = {

    LANG_SWITCH: "LANG_SWITCH",

    USERCARD_REQUEST: "USERCARD_REQUEST",
    USERCARD_SUCCESS: "USERCARD_SUCCESS",
    USERCARD_FAILURE: "USERCARD_FAILURE",


    USERROW_SELECT: "USERROW_SELECT",
    ADD_USER: "ADD_USER",
    EDIT_USER: "EDIT_USER",
    CLOSE_USER_FORM: "CLOSE_USER_FORM",
    DISMISS_MESSAGE: "DISMISS_MESSAGE",


    USERLIST_REQUEST: "USERLIST_REQUEST",
    USERLIST_SUCCESS: "USERLIST_SUCCESS",
    USERLIST_FAILURE: "USERLIST_FAILURE",

    USER_READ_REQUEST: "USER_READ_REQUEST",
    USER_READ_SUCCESS: "USER_READ_SUCCESS",
    USER_READ_FAILURE: "USER_READ_FAILURE",


    USER_UPDATE_REQUEST: "USER_UPDATE_REQUEST",
    USER_UPDATE_SUCCESS: "USER_UPDATE_SUCCESS",
    USER_UPDATE_FAILURE: "USER_UPDATE_FAILURE",

    USER_DELETE_REQUEST: "USER_DELETE_REQUEST",
    USER_DELETE_SUCCESS: "USER_DELETE_SUCCESS",
    USER_DELETE_FAILURE: "USER_DELETE_FAILURE",

    USER_CREATE_REQUEST: "USER_CREATE_REQUEST",
    USER_CREATE_SUCCESS: "USER_CREATE_SUCCESS",
    USER_CREATE_FAILURE: "USER_CREATE_FAILURE"
};


/*
    UserList Actions
*/
export const userListRequest = (req) => {
    return {
        type: ActionType.USERLIST_REQUEST,
        req
    }
};

const userListSuccess = (req, data) => {
    return {
        type: ActionType.USERLIST_SUCCESS,
        req,
        data

    }
};

export const dismissMessage = (msg) => {
    return {
        type: ActionType.DISMISS_MESSAGE,
        msg
    }
};

const URL_BASE = "http://localhost:8080/api/users";

const OPS_BASE = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
    body: null,
};

export function fetchUsers(store, req = {sort: store.userlist.sort, query: store.userlist.query}) {
    store.dispatch(userListRequest(req));
    console.debug('fetching userlist...', req);
    return (dispatch) => {

        //const url = `${URL_BASE}/?q=${req.query}&sort=${req.sort.by},${req.sort.order}`;
        //const url = `./data/dummy/userlist.json`;
        const url = (DUMMY) ? `${PREF_DUMMY_URL}GET__${req.sort.by}_${req.sort.order}.json?q=${req.query}&sort=${req.sort.by},${req.sort.order}` : `${URL_BASE}/?q=${req.query}&sort=${req.sort.by},${req.sort.order}`;
        console.log('search url:', url);
        return fetch(url, OPS_BASE)
            .then(response => {
                    console.debug('response', response);
                    return response.json()
                }
            )
            .then(json => {
                console.log('response.json()', json);
                console.debug('response ', Immutable.fromJS(json));
                return store.dispatch(userListSuccess(req, json)
                )
            })
            .catch(ex => console.error('parsing failed', ex));
    };
}


/*
    UserCard Actions
*/
export const userCardRequest = (req) => {
    return {
        type: ActionType.USERCARD_REQUEST,
        req
    }
};

const userCardSuccess = (req, data) => {
    return {
        type: ActionType.USERCARD_SUCCESS,
        req,
        data

    }
};

export function fetchUserCard(store, req) {
    store.dispatch(userCardRequest(req));

    return (dispatch) => {
        return fetch('./data/userlist.json')
            .then(response => {

                    return response.json()
                }
            )
            .then(json => {
                console.log('response.json()', json);
                console.debug('response -----------', Immutable.fromJS(json));
                //???return store.dispatch(userListSuccess(Immutable.fromJS(json))
                return store.dispatch(userCardSuccess(req, json)
                )
            })
            .catch(ex => console.error('parsing failed', ex));
    };
}

export const userUpdateRequest = (req) => {
    return {
        type: ActionType.USER_UPDATE_REQUEST,
        req
    }
};

const userUpdateSuccess = (req, data) => {
    return {
        type: ActionType.USER_UPDATE_SUCCESS,
        req,
        data
    }
};

export const updateUser = (store, req) => {
    store.dispatch(userUpdateRequest(req));
    console.debug('update user from form values', req);
    return (dispatch) => {

        const method = (req.id ? 'PUT' : 'POST');
        const opts = {...OPS_BASE, method: getFetchMethod(method), body: null};
        const url = (DUMMY) ? `${PREF_DUMMY_URL}${method}.json?` : URL_BASE;
        console.log('updating user...', opts);
        return fetch(url, opts)
            .then(response => {
                    console.debug('update user response', response);
                    return response.json()
                }
            )
            .then(json => {
                console.log('response.json()', json);
                return store.dispatch(userUpdateSuccess(req, json)
                )
            })
            .catch(ex => console.error('parsing failed', ex));
    };
};

const userDeleteRequest = (req) => {
    return {
        type: ActionType.USER_DELETE_REQUEST,
        req
    }
};

const userDeleteSuccess = (req, data) => {
    return {
        type: ActionType.USER_DELETE_SUCCESS,
        req,
        data
    }
};

export const deleteUser = (store, req) => {
    store.dispatch(userDeleteRequest(req));
    /*     store.dispatch((req) => {
            return {
                type: ActionType.USER_DELETE_REQUEST,
                req
            }
        }); */

    console.debug('delete user:', req.id);
    return (dispatch) => {

        const opts = {...OPS_BASE, method: getFetchMethod('DELETE')};
        const url = (DUMMY) ? `${PREF_DUMMY_URL}DELETE.json?${req.id}` : `${URL_BASE}/${req.id}`;

        console.debug('request delete user...', opts);
        return fetch(url, opts)
            .then(response => {
                    console.debug('response', response);
                    return response
                }
            )
            .then(response => {
                console.debug('delete user response:', response);

                if (response.status === 200) {
                    store.dispatch(userDeleteSuccess(req, response.json));
                    return store.dispatch(fetchUsers(store))
                }
                else {
                    msgErr(store.translate, 'dlg.title.MSG_USER_DELETE_ERR');
                    return store.dispatch((req, json) => {
                        return {
                            type: ActionType.USER_DELETE_FAILURE,
                            req
                        }
                    })
                }
            })
            .catch(ex => {
                msgErr(store.translate, 'dlg.title.MSG_USER_DELETE_ERR');
                console.error('error deleting user', ex);
            });
    };
};

export const selectUser = (user) => {
    return {
        type: ActionType.USERROW_SELECT,
        user
    }
};

export const addUser = () => {
    return {
        type: ActionType.ADD_USER
    }
};

export const editUser = (user) => {
    return {
        type: ActionType.EDIT_USER,
        user
    }
};

export const closeUserForm = () => {
    return {
        type: ActionType.CLOSE_USER_FORM
    }
};
///???
export const switchLang = (code) => {
    return {
        type: ActionType.LANG_SWITCH,
        code
    }
};










