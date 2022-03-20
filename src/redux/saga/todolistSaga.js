
import { call, delay, put, takeLatest } from 'redux-saga/effects'
import AXIOS from 'axios';
import { GET_TASK_TYPE } from '../actions/actionTypes';
import { todolistService } from '../../services/todolistService';
import { ADD_TASK_API_ACTION, CHECK_TASK_APIT_ACTION, DELETE_TASK_API_ACTION, GET_TASK_API_ACTION, REJECT_TASK_API_ACTION } from '../constants/todolistActionConst';

// Day cung chi la mot middleware
/**
 *  Example with fork and take
 * function * getAllTaskList (){
    while(true){
       yield take("getTaskAPI");
        console.log(test) 
    }
    export function * rootSaga(){
    yield fork(getAllTaskList);
}

}
 */

const _API = "http://svcy.myclass.vn/api/ToDoList";
function * getAllTaskList(arg) {
    /** 
     * yield is non-blocking which means it is synchronous
     * so that code will be executed in sequence qua tung yield
     */
    let loadingAction = {
        type: "IS_LOADING"
    }
    yield put (loadingAction);
    yield  delay(1000);

    // console.log("arg",arg)
    let response = yield call(todolistService.getTaskListAPIService) // todolistService la mot object chu khong phai 
   // console.log(response)

    yield put({type:"NO_LOADING"});
    // use Put tuong tu nhi dispatch cua redux-thunk
    // put se dispatch action len tren redux reducer va voi reducer thi se tu xet type de manipulate cac state
    yield put( {
        type: GET_TASK_TYPE,
        taskList: response.data
    });
}

export function * toDoListSaga (){
    yield takeLatest(GET_TASK_API_ACTION, getAllTaskList)
}

// ---------------- ADD NEW TASK ---------------
function * addNewTask(data){
    let taskName = data.taskName
    console.log(taskName)
    try{
        const response = yield call(()=>{
          return  todolistService.addNewTaskService(taskName)
        });
        // console.log(response);
        // console.log(response.status);
        if (response.status === 200){
            yield put ({
                type: GET_TASK_API_ACTION,
            })
        }
    }
    catch(err){
        console.error(err)
    }
    // put nay khong the la GET_TASK_TYPE duoc vi neu the no se di chuyen de redux, tuy nhien neu put de GET_TASK_API_ACTION thi se tu dong tim den action do
    // no se tuong tu nhi dispatch(mot function ben trong day vi GET_TASK_API_ACTION === getAllTaskList

}

export function * theoDoiActionAddTask(){
    yield takeLatest(ADD_TASK_API_ACTION,addNewTask);
}


// ------------ DELETE TASK -------------

function * deleteTask(data){
    let taskName = data.taskName
    console.log(taskName)
    try{
        const response = yield call(()=>{
          return  todolistService.deleteTaskService(taskName)
        });
        if (response.status === 200){
            yield put ({
                type: GET_TASK_API_ACTION,
            })
        }
    }
    catch(err){
        console.error(err)
    }
}
export function * theoDoiActionDeleteTask(){
    yield takeLatest(DELETE_TASK_API_ACTION, deleteTask);
}

// ------------- CHECK DONE TASK ------------

function * checkTask (data){
    let taskName = data.taskName;
    console.log(taskName)
    try{
        const response = yield call(()=>{
          return  todolistService.checkTaskService(taskName)
        });
        if (response.status === 200){
            yield put ({
                type: GET_TASK_API_ACTION,
            })
        }
    }
    catch(err){
        console.error(err)
    }
}
export function * theoDoiActionCheckTask(){
    yield takeLatest(CHECK_TASK_APIT_ACTION, checkTask);
}

// ------------- REJECT TASK ------------

function * rejectTask (data){
    let taskName = data.taskName;
    console.log(taskName)
    try{
        const response = yield call(()=>{
          return  todolistService.rejectTaskService(taskName)
        });
        if (response.status === 200){
            yield put ({
                type: GET_TASK_API_ACTION,
            })
        }
    }
    catch(err){
        console.error(err)
    }
}
export function * theoDoiActionRejectTask(){
    yield takeLatest(REJECT_TASK_API_ACTION, rejectTask);
}