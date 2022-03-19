import { ADD_NEW_TASK, GET_TASK_TYPE } from "../actions/actionTypes";


const initialState = {
    taskList:[],
    error:{
        errorStatus:""
    },
    newTask:{
        taskName: "",
    //       status: false
    }
};


export const appStateReducer = (state = initialState ,  action)=>{
    switch(action.type){
        case GET_TASK_TYPE:{
            state.taskList = action.taskList;
            console.log("FROM REDUX",action.taskList);
            return {...state}
        }
        case ADD_NEW_TASK:{
            console.log(action.newTask);
            return {...state};
        }
        default: return {...state};
    }
}