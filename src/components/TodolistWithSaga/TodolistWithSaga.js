import React from 'react'
import style from '../../pages/TodoList/style.module.css';
import { useState, useRef, useEffect } from 'react';
import AXIOS from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_TASK_API_ACTION, CHECK_TASK_APIT_ACTION, DELETE_TASK_API_ACTION, GET_TASK_API_ACTION, REJECT_TASK_API_ACTION } from '../../redux/constants/todolistActionConst';





export default function TodolistWithSaga() {
    const { taskList, error } = useSelector(state => state.appState);
   
    //const [loadingState, setLoadingState] = useState(false);
    const dispatch = useDispatch();
    const taskRef = useRef();

    useEffect(() => {
        getAllTask();
        // console.log("state", state);
        return () => {
        }
    }, [])



    const getAllTask = () => {
        //console.log('getalltask');
        // DUNG ACTION LIST DE LAY DU LIEU 
        // vi tat ca action bay h se lam cong viec la lay API
        // NOTE : va vi getTaskListAPI return ve gia tri ca 1 function nen ben trong Reducer ta can phai co 1 middleware de xu ly function nay truoc 
        // middleware giup cho viec lay API duoc dien ra turoc sau khi dispatch len redux de bao dam state ben trong redux nhan duoc gia tri return tu API

        dispatch({ type: GET_TASK_API_ACTION})
    }

    const addNewtaskHandler = (e) => {
        // Kiem tra gia tri cua input
        if (taskRef.current.value === "") {
            return Swal.fire({
                title: 'Error!',
                text: 'This field can not be empty !!!',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        if (error.errorStatus !== "") {
            return Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        } else {
            dispatch({
                type: ADD_TASK_API_ACTION,
                taskName: taskRef.current.value
            })
            //console.log('new task',newTaskName)
        }
    }

    const deleteTaskHandler = (task) => {
        //console.log(task.taskName);
        // console.log(`${_API}/deleteTask?taskName=${task.taskName}`);
        // AXIOS.delete(`${_API}/deleteTask?taskName=${task.taskName}`)
        //     .then((res) => {
        //         Swal.fire({
        //             title: 'Success!',
        //             text: res.data,
        //             icon: 'success',
        //             confirmButtonText: 'Cool'
        //         })
        //         getAllTask();
        //     })
        //     .catch((err) => {
        //         console.log(err.response.data)
        //     })

        /**
         * THUC HANH VOI REDUX
         */

        dispatch({
            type: DELETE_TASK_API_ACTION,
            taskName: task.taskName
        })

    }

    const completeTaskHandler = (task) => {
        // console.log(task.taskName);
        // console.log(`${_API}/doneTask?taskName=${task.taskName}`);
        // AXIOS.put(`${_API}/doneTask?taskName=${task.taskName}`)
        //     .then((res) => {
        //         Swal.fire({
        //             title: 'Success!',
        //             text: res.data,
        //             icon: 'success',
        //             confirmButtonText: 'Cool'
        //         })
        //         getAllTask();
        //     })
        //     .catch((err) => {
        //         console.log(err.response.data)
        //     })

        dispatch({
            type: CHECK_TASK_APIT_ACTION,
            taskName: task.taskName
        })

    }

    const rejectTaskHandler = (task) => {
        // AXIOS.put(`${_API}/rejectTask?taskName=${task.taskName}`)
        //     .then((res) => {
        //         Swal.fire({
        //             title: 'Success!',
        //             text: res.data,
        //             icon: 'success',
        //             confirmButtonText: 'Cool'
        //         })
        //         getAllTask();
        //     })
        //     .catch((err) => {
        //         console.log(err.response.data)
        //     })
        dispatch({
            type: REJECT_TASK_API_ACTION,
            taskName:task.taskName
        })
    }

    const renderTasksList = () => {
        return taskList.map((task, index) => {
            if (!task.status) {
                return <li key={index}>
                    <span>{task.taskName}</span>
                    <div className={style.buttons}>
                        <button className={style.complete} onClick={() => {
                            completeTaskHandler(task)
                        }}>
                            <i className='fa fa-check-circle'></i>
                        </button>
                        <button className={style.remove} onClick={() => {
                            deleteTaskHandler(task)
                        }}>
                            <i className='fa fa-trash-alt'></i>
                        </button>
                    </div>
                </li>
            }
        })
    }
    const renderCompletedTasksList = () => {
        return taskList.map((task, index) => {
            if (task.status) {
                return <li key={index}>
                    <span>{task.taskName}</span>
                    <div className={style.buttons}>
                        <button className={style.complete} onClick={() => {
                            rejectTaskHandler(task)
                        }}>
                            <i className='fa fa-undo'></i>
                        </button>
                        <button className={style.remove} onClick={() => {
                            deleteTaskHandler(task)
                        }}>
                            <i className='fa fa-trash-alt'></i>
                        </button>

                    </div>
                </li>
            }
        })
    }


    const newTaskChangeHandler = (e) => {
        let newerrorStatus = "";
        let enterValue = e.target.value;
        if (enterValue.trim() === "") {
            newerrorStatus = "This field can not be empty !!!";
        }

        // setState({
        //   ...state,
        //   newTask: {
        //     taskName: enterValue,
        //     status: false,
        //   },
        //   error: {
        //     errorStatus: newerrorStatus
        //   }
        // }, () => {
        //   //console.log(this.state);
        // })
    }

 



    return (
        <React.Fragment>
           
            <div className={style.card}>
                <div className={style.card__header}>
                    <img src={require('../../pages/TodoList/bg.png')}></img>
                </div>
                <div className={style.card__body}>
                    <div className={style.card__content}>
                        <div className={style.card__title}>
                            <h2>My task</h2>
                            <p>Septemper 9,2020</p>
                        </div>
                        <div className={style.card__add}>
                            <input ref={taskRef} id='newTask' type="text" placeholder='Enter an activity...' onChange={newTaskChangeHandler} />
                            <button id="addItem" onClick={addNewtaskHandler}>
                                <i className='fa fa-plus'></i>
                            </button>
                        </div>
                        <div className={style.card__error}>
                            <p>{error.errorStatus}</p>
                        </div>
                        <h2>New Tasks</h2>
                        <div className={style.card__todo}>
                            {/* RENDER TASK LIST */}
                            <ul className={style.todo} id="todo">
                                {renderTasksList()}
                            </ul>
                        </div>
                        <h2>Completed Tasks</h2>
                        <div className={style.card__todo}>
                            {/* RENDER TASK LIST */}
                            <ul className={style.todo} id="todo">
                                {renderCompletedTasksList()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}
