import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { oneProductReducer, productReducer } from "./reducers/productReducer";
import {loginReducer, passwordResetUserReducer, profileUpdateUserReducer} from "./reducers/userReducer"

const reduce=combineReducers({
    product:productReducer,
    productDetails:oneProductReducer,
    user:loginReducer,
    profileUpdate:profileUpdateUserReducer,
    passwordReset:passwordResetUserReducer,
});
const initialState={};
const middleWare=[thunk];
const store = createStore(
    reduce,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );
  
export default store;