

import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import { appStateReducer } from './reducers/appStateReducer';



import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './saga/rootSaga';

// Configure redux Saga;
const middleWareSaga = createMiddleWareSaga();



const rootReducer = combineReducers({
    // state here
    appState : appStateReducer
})



const store = createStore(rootReducer,applyMiddleware(reduxThunk,middleWareSaga));

middleWareSaga.run(rootSaga)
export default store;