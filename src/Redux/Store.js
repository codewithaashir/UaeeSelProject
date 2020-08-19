/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import NetInfo from './Reducer/NetInfo';
import CartList from './Reducer/Cart';
import SignUp from './Reducer/SignUp';
import User from './Reducer/User';
import WishList from './Reducer/WishList';
const AppReducer = combineReducers({
    SignUp,
    User,
    WishList,
    CartList,
    NetInfo,
});
const middleware = [
    thunk,
    // more middleware
  ];
const logger = (store) => {
    return (next) => {
        return (action) => {
            const result = next(action);
            // console.log('[Middleware] next state =>', store.getState());
            return result;
        };
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    AppReducer,
    composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
