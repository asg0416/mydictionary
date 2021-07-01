import { createStore, combineReducers, applyMiddleware  } from "redux";
import dict from './modules/dict';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

// 미들웨어 리스트로 들고옴
const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({dict});
const store = createStore(rootReducer, enhancer);

export default store;