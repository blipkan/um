import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { localeReducer as locale } from 'react-localize-redux';
import userlist from './userlist';
import usercard from './usercard';


const rootReducer = combineReducers({ userlist, usercard, locale, form: reduxFormReducer });
export default rootReducer;