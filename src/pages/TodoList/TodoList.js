
/**
 * 
 * Component with React Class Component  (statefull component)
 */
import React, { Component } from 'react'
import style from './style.module.css';
import AXIOS from 'axios';
import Swal from 'sweetalert2'
// http://svcy.myclass.vn/swagger
const _API = "http://svcy.myclass.vn/api/ToDoList"
export default class TodoList extends Component {
    state = {
        tasklist: [],
        newTask: {
            taskName: "",
            status: false
        },
        error: {
            errorStatus: ""
        }
    };
    getAllTask = () => {
        AXIOS.get(`${_API}/GetAllTask`)
            .then((res) => {
                this.setState({ ...this.state, tasklist: res.data }, () => {
                    console.log("state", this.state)
                })
                // console.log(res.data);
            }).catch(err => {
                // console.error(err)
            })
    }

    // To help API only run one time when initialise the page
    componentDidMount = () => {
         this.getAllTask()
    }

    /*
        USING PROMISE
       getAllTask = ()=>{
        let promise = AXIOS({
            url: _API + "GetAllTask",
            method: "GET",
        });
        promise.then((res)=>{
            console.log(res.data);
        });
        promise.catch((err)=>{
            console.error(err)
        })
    }
    */
    addNewtaskHandler = (e) => {
        if (this.state.newTask.taskName === ""){
            this.setState({...this.state.error, errorStatus:"This field can not be empty !!!"})
            return Swal.fire({
                title: 'Error!',
                text: 'This field can not be empty !!!',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
        if (this.state.error.status === ""){
            return Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }else{
            let newTask = this.state.newTask;
            //console.log('new task',newTaskName);
            AXIOS.post(`${_API}/AddTask`,{taskName:newTask.taskName})
            .then((res) => {
                this.getAllTask();
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
   
    deleteTaskHandler=(task)=>{
        console.log(task.taskName);
        console.log(`${_API}/deleteTask?taskName=${task.taskName}`);
        AXIOS.delete(`${_API}/deleteTask?taskName=${task.taskName}`)
        .then((res)=>{
            Swal.fire({
                title: 'Success!',
                text: res.data,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              this.getAllTask();
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    completeTaskHandler=(task)=>{
        // console.log(task.taskName);
        // console.log(`${_API}/doneTask?taskName=${task.taskName}`);
        AXIOS.put(`${_API}/doneTask?taskName=${task.taskName}`)
        .then((res)=>{
            Swal.fire({
                title: 'Success!',
                text: res.data,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              this.getAllTask();
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    rejectTaskHandler= (task)=>{
        AXIOS.put(`${_API}/rejectTask?taskName=${task.taskName}`)
        .then((res)=>{
            Swal.fire({
                title: 'Success!',
                text: res.data,
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              this.getAllTask();
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    renderTasksList = () => {
        return this.state.tasklist.map((task, index) => {
            if (!task.status) {
                return <li key={index}>
                    <span>{task.taskName}</span>
                    <div className={style.buttons}>
                        <button className={style.complete} onClick={this.completeTaskHandler.bind(this,task)}>
                            <i className='fa fa-check-circle'></i>
                        </button>
                        <button className={style.remove} onClick={this.deleteTaskHandler.bind(this,task)}>
                            <i className='fa fa-trash-alt'></i>
                        </button>
                    </div>
                </li>
            }
        })
    }
    renderCompletedTasksList = () => {
        return this.state.tasklist.map((task, index) => {
            if (task.status) {
                return <li key={index}>
                    <span>{task.taskName}</span>
                    <div className={style.buttons}>
                    <button className={style.complete} onClick={this.rejectTaskHandler.bind(this,task)}>
                            <i className='fa fa-undo'></i>
                        </button>
                        <button className={style.remove} onClick={this.deleteTaskHandler.bind(this,task)}>
                            <i className='fa fa-trash-alt'></i>
                        </button>
                        
                    </div>
                </li>
            }
        })
    }

    newTaskChangeHandler = (e) => {
        let newerrorStatus = "";
        let enterValue = e.target.value;
        if (enterValue.trim() === "") {
            newerrorStatus = "This field can not be empty !!!";
        }

        this.setState({
            ...this.state,
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

    



    render() {
        return (
            <div className={style.card}>
                <div className={style.card__header}>
                    <img src={require('./bg.png')}></img>
                </div>
                <div className={style.card__body}>
                    <div className={style.card__content}>
                        <div className={style.card__title}>
                            <h2>My task</h2>
                            <p>Septemper 9,2020</p>
                        </div>
                        <div className={style.card__add}>
                            <input ref={(el) => this.myNewTask = el} id='newTask' type="text" placeholder='Enter an activity...' onChange={this.newTaskChangeHandler} />
                            <button id="addItem" onClick={this.addNewtaskHandler}>
                                <i className='fa fa-plus'></i>
                            </button>
                        </div>
                        <div className={style.card__error}>
                            <p>{this.state.error.errorStatus}</p>
                        </div>
                        <h2>New Tasks</h2>
                        <div className={style.card__todo}>
                            {/* RENDER TASK LIST */}
                            <ul className={style.todo} id="todo">
                                {this.renderTasksList()}
                            </ul>
                        </div>
                        <h2>Completed Tasks</h2>
                        <div className={style.card__todo}>
                            {/* RENDER TASK LIST */}
                            <ul className={style.todo} id="todo">
                                {this.renderCompletedTasksList()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
