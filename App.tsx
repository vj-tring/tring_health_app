import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import ThemeProvider from './src/utils/themeProvider';
import CustomErrorBoundary from './src/components/CustomErrorBoundary';
import AppContainer from './src/navigation/AppContainer';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils/toastConfig';

if (__DEV__) {
  require('./ReactotronConfig');
}

const App = () => {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <CustomErrorBoundary>
              <AppContainer />
              <Toast config={toastConfig} topOffset={60} />
            </CustomErrorBoundary>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
