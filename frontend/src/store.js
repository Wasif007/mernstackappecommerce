import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { allProductReducer, oneProductReducer, productReducer, reviewPostingReducer } from "./reducers/productReducer";
import {loginReducer, passwordResetUserReducer, profileUpdateUserReducer} from "./reducers/userReducer"
import { addToCartReducer } from "./reducers/cartReducer";
import { myOrderReducer, orderPlaceReducer, singleOrderFrontReducer } from "./reducers/orderReducer";

const reduce=combineReducers({
    product:productReducer,
    productDetails:oneProductReducer,
    user:loginReducer,
    profileUpdate:profileUpdateUserReducer,
    passwordReset:passwordResetUserReducer,
    cart:addToCartReducer,
    orderInfo:orderPlaceReducer,
    myOrder:myOrderReducer,
    order:singleOrderFrontReducer,
    review:reviewPostingReducer,
    adminAllProducts:allProductReducer,
});
const initialState={
  cart: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
      shippingInfo:localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}
    
  },
};
const middleWare=[thunk];
const store = createStore(
    reduce,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
  );
  
export default store;