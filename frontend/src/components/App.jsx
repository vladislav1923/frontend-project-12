import {useEffect} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Login, Chat, NotFound, Signup } from './pages';
import { Layout } from './';
import store from '../store';
import {useNetworkState} from "../hooks";
import {useTranslation} from "react-i18next";

function App() {
    const { t } = useTranslation();
    const networkState = useNetworkState();

    useEffect(() => {
        if (!networkState) {
            toast.error(t('app.offlineToastText'));
        }
    }, [networkState]);

    return (
      <>
          <Provider store={store}>
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
          </Provider>
          <ToastContainer />
      </>
    );
}

export default App;
