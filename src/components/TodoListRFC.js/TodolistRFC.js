import React, { useEffect, useRef, useState } from 'react'
import style from '../../pages/TodoList/style.module.css';
import AXIOS from 'axios';
import Swal from 'sweetalert2';
const _API = "http://svcy.myclass.vn/api/ToDoList"
export default function TodolistRFC() {
  const [state, setState] = useState({
    tasklist: [],
    newTask: {
      taskName: "",
      status: false
    },
    error: {
      errorStatus: ""
    }
  });

  const taskRef = useRef();

  useEffect(() => {
    getAllTask();
    // console.log("state", state);
    return () => {
    }
  }, [])


  const getAllTask = () => {
    AXIOS.get(`${_API}/GetAllTask`)
      .then((res) => {
        setState({ ...state, tasklist: res.data }, () => {
          console.log("state", state)
        })

        // console.log(res.data);
      }).catch(err => {
        // console.error(err)
      })
  }
  const resetValueInput = ()=>{
    document.querySelector('#newTask').value= '';
  }

  const addNewtaskHandler = (e) => {
    //console.log(taskRef.current.value);
    if (taskRef.current.value === "") {
      setState({
        ...state,
        error: {
          errorStatus: "This field can not be empty !!!"
        }
      });
      console.log("state", state);
      return Swal.fire({
        title: 'Error!',
        text: 'This field can not be empty !!!',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
    if (state.error.status === "") {
      return Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    } else {
      let newTask = state.newTask;
      //console.log('new task',newTaskName);
      AXIOS.post(`${_API}/AddTask`, { taskName: newTask.taskName })
        .then((res) => {
          getAllTask();
          resetValueInput();
          Swal.fire({
            title: 'Success!',
            text: 'Adding successful',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        }).catch(err => {
          //console.error(err.response.data)
        })
    }
  }

  const deleteTaskHandler = (task) => {
    console.log(task.taskName);
    console.log(`${_API}/deleteTask?taskName=${task.taskName}`);
    AXIOS.delete(`${_API}/deleteTask?taskName=${task.taskName}`)
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: res.data,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        getAllTask();
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  const completeTaskHandler = (task) => {
    // console.log(task.taskName);
    // console.log(`${_API}/doneTask?taskName=${task.taskName}`);
    AXIOS.put(`${_API}/doneTask?taskName=${task.taskName}`)
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: res.data,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        getAllTask();
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  const rejectTaskHandler = (task) => {
    AXIOS.put(`${_API}/rejectTask?taskName=${task.taskName}`)
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: res.data,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        getAllTask();
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  const renderTasksList = () => {
    return state.tasklist.map((task, index) => {
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
    return state.tasklist.map((task, index) => {
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

    setState({
      ...state,
      newTask: {
        taskName: enterValue,
        status: false,
      },
      error: {
        errorStatus: newerrorStatus
      }
    }, () => {
      //console.log(this.state);
    })
  }




  return (
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
            <p>{state.error.errorStatus}</p>
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
  )
}
