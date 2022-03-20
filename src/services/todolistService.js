
import AXIOS from 'axios';
const _API = "http://svcy.myclass.vn/api/ToDoList";
class TodolistService {
    //constructor(){}

    getTaskListAPIService() {
        return AXIOS.get(`${_API}/GetAllTask`);
    }

    addNewTaskService(newTaskName) {
        return AXIOS.post(`${_API}/AddTask`, { taskName: newTaskName })
    }

    deleteTaskService(taskName){
        return AXIOS.delete(`${_API}/deleteTask?taskName=${taskName}`)
    }

    rejectTaskService(taskName){
        return AXIOS.put(`${_API}/rejectTask?taskName=${taskName}`)
    }

    checkTaskService(taskName){
        return AXIOS.put(`${_API}/doneTask?taskName=${taskName}`)
    }
}

export const todolistService = new TodolistService();