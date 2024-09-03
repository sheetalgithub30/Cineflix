import {configureStore} from '@reduxjs/toolkit'
import { sliceReducer } from './slice.js';

export const store = configureStore({
  reducer:{
    movieReducer : sliceReducer,
},
});