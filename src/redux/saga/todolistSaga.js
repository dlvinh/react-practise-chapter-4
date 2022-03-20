
import { call, put, takeLatest } from 'redux-saga/effects'
import AXIOS from 'axios';
import { GET_TASK_TYPE } from '../actions/actionTypes';
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
function* getAllTaskList(arg) {
    console.log("arg",arg)
    let response = yield call(()=>{
       return AXIOS.get(`${_API}/GetAllTask`)
    })
    console.log(response)

    // use Put tuong tu nhi dispatch cua redux-thunk
    let action = {
        type: GET_TASK_TYPE,
        taskList: response.data
    }
    // put se dispatch action len tren redux reducer va voi reducer thi se tu xet type de manipulate cac state
    yield put(action);
}

export function * toDoListSaga (){
    yield takeLatest("getTaskAPI", getAllTaskList)
}
