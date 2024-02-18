import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';
import AuthProvider from './providers/AuthProvider.jsx';
import store from '../src/store/index.js'
import { Provider } from 'react-redux';
import { io } from 'socket.io-client'
import BackendApiProvider from './contexts/BackendApiProvider.jsx';


const init = async () => {
  const i18n = i18next.createInstance();

  const socket = io('/', { autoConnect: false })

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BackendApiProvider socket={socket}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BackendApiProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default init;