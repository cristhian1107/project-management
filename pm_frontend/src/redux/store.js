import { configureStore } from '@reduxjs/toolkit';
import { userSlice, drawerSlice, modalSlice } from 'redux/states';

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    drawer: drawerSlice.reducer,
    modal: modalSlice.reducer
  }
});
