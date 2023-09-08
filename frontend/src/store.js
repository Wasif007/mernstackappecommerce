import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {devToolsEnhancer} from "redux-devtools-extension";

const reduce=combineReducers({});
const initialState={};
const middleWare=[thunk];

const store=createStore(reduce,initialState,devToolsEnhancer(applyMiddleware(...middleWare)));

export default store;