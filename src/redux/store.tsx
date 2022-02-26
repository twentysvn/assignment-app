import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {auth} from './reducers';

const combinedReducers = combineReducers({auth});

export const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(logger, thunk)),
);
