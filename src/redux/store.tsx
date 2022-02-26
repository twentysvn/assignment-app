import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {places} from './reducers';

const combinedReducers = combineReducers({places});

export const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(logger, thunk)),
);
