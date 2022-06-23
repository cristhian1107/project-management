import { createSlice } from '@reduxjs/toolkit';

export const UserEmptyState = {
  campus: '',
  company_id: '',
  department: '',
  email: '',
  gender: '',
  id: 0,
  lastname: '',
  name: '',
  options: [],
  position: '',
  role: '',
  role_id: 0,
  user: '',
  jwt: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: UserEmptyState,
  reducers: {
    createUser: (state, action) => action.payload,
    resetUser: () => UserEmptyState
  }
});

export const { createUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
