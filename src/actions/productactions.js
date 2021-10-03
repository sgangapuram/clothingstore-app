import {ActionTypes} from "../constants/action-types";

export const setProducts = (products) => {
    console.log('----set products called from product actions----');
    return {
        type : ActionTypes.SET_PRODUCTS,
        payload : products,
    }
}

export const selectedProduct = (product) => {
    return {
        type : ActionTypes.SELECTED_PRODUCT,
        payload : product,
    }
}