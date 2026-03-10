

import SCREEN from '../screenNames';
import * as Screens from '../../screens';

const AuthScreenStack = [
  {
    name: SCREEN.LOGIN_SCREEN,
    component: Screens.LoginScreen,
  },
  {
    name: SCREEN.SIGN_UP,
    component: Screens.SignupScreen,
  },
  {
    name: SCREEN.RESET_PASSWORD,
    component: Screens.ResetPassword,
  },
  {
    name: SCREEN.VERIFY_OTP,
    component: Screens.VerifyOtp,
  },
  {
    name: SCREEN.UPDATE_PASSWORD,
    component: Screens.UpdatePassword,
  },
];

export default AuthScreenStack;
