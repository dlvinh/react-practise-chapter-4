

import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import { appStateReducer } from './reducers/appStateReducer';


const rootReducer = combineReducers({
    // state here
    appState : appStateReducer
})



const store = createStore(rootReducer,applyMiddleware(reduxThunk));

export default store;