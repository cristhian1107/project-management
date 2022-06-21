import { configureStore } from '@reduxjs/toolkit';
import { userSlice, drawerSlice } from 'redux/states';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    drawer: drawerSlice.reducer
  }
});
