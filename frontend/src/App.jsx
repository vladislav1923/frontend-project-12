import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Login, Chat, NotFound, Signup } from './pages';
import { Layout } from './components';
import store from './store';

function App() {
  return (
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
  );
}

export default App;
