import {createSlice} from '@reduxjs/toolkit';

export const assetsSlice = createSlice({
  name: 'assets',
  initialState: {iconMap: {} as Record<string, string>},
  reducers: {
    updateIconMap: (state, action: {payload: Record<string, string>}) => {
      state.iconMap = action.payload;
    },
  },
});

export const {updateIconMap} = assetsSlice.actions;
export default assetsSlice.reducer;
