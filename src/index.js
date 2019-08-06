import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import DevTools from './components/DevTools'
import configureStore from './store/configureStore'

import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as process from "react-modal";

const USE_DEV_TOOLS=false;
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <div>
            <App />
            {
               (USE_DEV_TOOLS && process.env.NODE_ENV !== 'production')
                &&
                <DevTools />
            }
        </div>
    </Provider>,
    document.getElementById('root')

);
registerServiceWorker();

