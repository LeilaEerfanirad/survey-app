import { combineReducers } from '@reduxjs/toolkit';
import settingsSlice from './features/settingsSlice';



const rootReducer = combineReducers({
    settings: settingsSlice
})

export default rootReducer