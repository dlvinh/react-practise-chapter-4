import AXIOS from 'axios';
import Swal from 'sweetalert2';
import { ADD_NEW_TASK, GET_TASK_TYPE } from './actionTypes';
const _API = "http://svcy.myclass.vn/api/ToDoList";

export const getTaskListAPI = () => {
    // Xu ly du lieu
    // return ve funcption moi 
    return dispatch => {
        AXIOS.get(`${_API}/GetAllTask`)
            .then((res) => {
                //console.log(res.data)
                let action = {
                    type: GET_TASK_TYPE,
                    taskList: res.data
                }
                dispatch(action);
                // console.log(res.data);
            }).catch(err => {
                // console.error(err)
            })
    }
}

export const addNewTask = (newTaskName) => {
    // return async dispatch => {
    //     try{
    //         let res = await AXIOS({
    //             url:`${_API}/AddTask/`,
    //             method: 'POST',
    //             data:{taskName: newTaskName}
    //         });
    //         if(res.status === 200){
    //             console.log("add thanh cong")
    //             dispatch(getTaskListAPI());
    //         }
    //     }catch(e){
    //         console.log(e);
    //     }
    // }
    return dispatch => {
        AXIOS.post(`${_API}/AddTask`, { taskName: newTaskName })
            .then((res) => {
                document.querySelector('#newTask').value = '';
                Swal.fire({
                    title: 'Adding Success!',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                dispatch(getTaskListAPI());
            })
            .catch((e) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
                //console.log(e)
            })

    }
}

export const deleteTaskAction = (taskName) => {
    return dispatch => {
        console.log("...deleting")
        AXIOS.delete(`${_API}/deleteTask?taskName=${taskName}`)
            .then((res) => {
                dispatch(getTaskListAPI())
                Swal.fire({
                    title: 'Deleting Success!',
                    text: res.data,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch((err) => {
                console.log(err.response.data)
                Swal.fire({
                    title: 'Deleting Fail!',
                    text:   "Can not delete task",
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            })
    }
}

export const completeTaskAction = (taskName) =>{
    return dispatch =>{
        AXIOS.put(`${_API}/doneTask?taskName=${taskName}`)
        .then((res) => {
            dispatch(getTaskListAPI());
            Swal.fire({
                title: 'Success!',
                text: res.data,
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }
}

export const rejectTaskAction = (taskName) =>{
    return dispatch=>{
        AXIOS.put(`${_API}/rejectTask?taskName=${taskName}`)
            .then((res) => {
                dispatch(getTaskListAPI())
                Swal.fire({
                    title: 'Success!',
                    text: res.data,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }
}