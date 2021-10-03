import {ActionTypes} from "../constants/action-types";

const initialState = {
    products :[]
}

export  const productReducer = (state=initialState, {type, payload}) => {
    switch (type){
        case ActionTypes.SET_PRODUCTS:
            console.log('----product reducer called----');
            return {...state, products:payload};

        default:
            console.log('----default state update called from reducer----');
            return state;
    }
}


export  const selectedProductReducer = (state={}, {type, payload}) => {
    switch (type){
        case ActionTypes.SELECTED_PRODUCT:
            return {...state, ...payload};
        default:
            return state;
    }
}