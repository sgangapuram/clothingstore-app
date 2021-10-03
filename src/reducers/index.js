import {combineReducers} from "redux";
import {productReducer, selectedProductReducer} from "./productReducder";

const reducers = combineReducers({
    allProducts: productReducer,
    product : selectedProductReducer,
})

export default reducers;