import {createSlice} from '@reduxjs/toolkit';

type AuthState = {
  isUserLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  userInfo: any;
  isConsented: boolean;
};

const initialState: AuthState = {
  isUserLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  userInfo: {},
  isConsented: false,
};

//User Login Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLoggedIn: (state, {payload: {isUserLoggedIn}}) => {
      state.isUserLoggedIn = isUserLoggedIn;
    },
    setUserAccessToken: (state, {payload: {accessToken, refreshToken}}) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    setUserInfo: (state, {payload: {userInfo}}) => {
      state.userInfo = userInfo;
    },
    logout: () => initialState,
    resetAuthState: () => initialState,
  },
});

export default authSlice.reducer;
export const {
  setUserLoggedIn,
  setUserAccessToken,
  setUserInfo,
  logout,
  resetAuthState,
} = authSlice.actions;
