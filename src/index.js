import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import Store from './ducks/Store';
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={Store}>
    <HashRouter>
        <App />
    </HashRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
