import {useEffect} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {useTranslation} from "react-i18next";
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Login, Chat, NotFound, Signup } from './pages';
import { Layout } from './';
import store from '../store';
import {useNetworkState} from "../hooks";

function App() {
    const { t } = useTranslation();
    const networkState = useNetworkState();

    const rollbarConfig = {
        accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
        environment: process.env.REACT_APP_ROLLBAR_ENVIRONMENT,
    };

    useEffect(() => {
        if (!networkState) {
            toast.error(t('app.offlineToastText'));
        }
    }, [networkState]);

    return (
      <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
              <ReduxProvider store={store}>
                  <Layout>
                      <BrowserRouter>
                          <Routes>
                              <Route path="/" element={<Chat />} />
                              <Route path="login" element={<Login />} />
                              <Route path="signup" element={<Signup />} />
                              <Route path="*" element={<NotFound />} />
                          </Routes>
                      </BrowserRouter>
                  </Layout>
              </ReduxProvider>
              <ToastContainer />
          </ErrorBoundary>
      </RollbarProvider>
    );
}

export default App;
