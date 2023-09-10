import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { oneProductReducer, productReducer } from "./reducers/productReducer";

const reduce=combineReducers({
    product:productReducer,
    oneProduct:oneProductReducer,
});
const initialState={};
const middleWare=[thunk];
const store = createStore(
    reduce,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );
  
export default store;