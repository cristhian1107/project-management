import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from 'redux/states';

export default configureStore({
  reducer: {
    user: userSlice.reducer
  }
});
