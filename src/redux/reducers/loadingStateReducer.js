import { LOADING } from "../actions/actionTypes";

const initialState = {
    isLoading: true // true when loading and false when off loading
};


export const loadingStateReducer = (state = initialState ,  action)=>{
    switch(action.type){
        case "IS_LOADING":{
            //console.log("is loading")
            state.isLoading = true;
            return {...state}
        }
        case "NO_LOADING":{
           // console.log("off loading")
            state.isLoading = false;
            return {...state}
        }
        default: return {...state};
    }
}