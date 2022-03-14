

import {combineReducers, createStore} from 'redux';

const state ={}
const rootReducer = combineReducers({
    // state here
    appState :state
})

const store = createStore(rootReducer);

export default store;