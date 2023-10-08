import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { allProductReducer, oneProductReducer, productCreatingAdminReducer, productDeletingAdminReducer, productReducer, productUpdatingAdminReducer, reviewPostingReducer } from "./reducers/productReducer";
import {allUsersReducer, loginReducer, passwordResetUserReducer, profileUpdateUserReducer, userDetailsReducer} from "./reducers/userReducer"
import { addToCartReducer } from "./reducers/cartReducer";
import { allOrderReducer, myOrderReducer, orderDeletingAdminReducer, orderPlaceReducer, orderUpdatingAdminReducer, singleOrderFrontReducer } from "./reducers/orderReducer";

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
    adminAllOrders:allOrderReducer,
    adminSingleProductCreation:productCreatingAdminReducer,
    adminProductDelete:productDeletingAdminReducer,
    adminOrderDelete:orderDeletingAdminReducer,
    productUpdate:productUpdatingAdminReducer,
    orderUpdate:orderUpdatingAdminReducer,
    allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
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