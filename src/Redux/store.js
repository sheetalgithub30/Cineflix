import {configureStore} from '@reduxjs/toolkit'
import { sliceReducer } from './slice.js';

const store = configureStore({
  reducer:{
    movieReducer : sliceReducer,
},
});

export default store;