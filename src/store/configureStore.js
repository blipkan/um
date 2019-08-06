import {createStore, applyMiddleware, compose} from 'redux' ;
import thunk from 'redux-thunk'          ;
import {createLogger} from 'redux-logger'  ;
//import api from '../middleware/api'
import rootReducer from '../reducers'      ;
import DevTools from '../components/DevTools' ;
import {languages} from '../constants';
import INITIAL_STATE from '../store/initialState' ;

import {initialize, addTranslation} from 'react-localize-redux';

const configureStore = (preloadedState = INITIAL_STATE) => {

    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            //    applyMiddleware(thunk, api, createLogger()),
            applyMiddleware(thunk, createLogger()),
            DevTools.instrument()
        )
    );

    /// init localization
    ///const languages = ['en', 'ru'];
    //const languages = languages;
    const defaultLanguage = languages[1];
    store.dispatch(initialize(languages, {defaultLanguage: defaultLanguage}));
    const json = require('../constants/global.locale.json');
    store.dispatch(addTranslation(json));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
};

export default configureStore
