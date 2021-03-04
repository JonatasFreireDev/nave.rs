import { createSlice } from '@reduxjs/toolkit';

const initialState: string = 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeToggled(state, action) {
      if (state === 'light') {
        state = 'dark';
      } else {
        state = 'light';
      }
    },
  },
});

export const { themeToggled } = themeSlice.actions;

export default themeSlice.reducer;
