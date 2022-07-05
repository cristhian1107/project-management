import { createSlice } from '@reduxjs/toolkit';

export const openModalState = {
  open: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: openModalState,
  reducers: {
    handleOpen: (state) => ({ ...state, open: true }),
    handleClose: (state) => ({ ...state, open: false })
  }
});

export const { handleOpen, handleClose } = modalSlice.actions;

export default modalSlice.reducer;
