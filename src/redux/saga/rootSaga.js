
import { all } from 'redux-saga/effects';
import * as ToDoListSaga from './todolistSaga';

export function* rootSaga() {
    // getTaskAPI duoc dispacth ben button de rootSaga co the catch duoc
    yield all([
        ToDoListSaga.toDoListSaga(),
        ToDoListSaga.theoDoiActionAddTask(),
        ToDoListSaga.theoDoiActionDeleteTask(),
        ToDoListSaga.theoDoiActionCheckTask(),
        ToDoListSaga.theoDoiActionRejectTask()
    ])
}
