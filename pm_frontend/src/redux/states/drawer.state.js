import { createSlice } from '@reduxjs/toolkit';

export const openDrawerState = {
  open: false
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: openDrawerState,
  reducers: {
    toggleDrawer: (state) => ({ ...state, ...{ open: !state.open } }),
    handleDrawer: (state, action) => ({ ...state, ...{ open: action.payload } })
  }
});

export const { toggleDrawer, handleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
