import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import Reducer from './Reducer';

export default createStore(Reducer, applyMiddleware(promiseMiddleware()));