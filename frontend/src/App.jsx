import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Chat, NotFound } from './pages';
import { Layout } from './components';

function App() {
  return (
      <Layout>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Chat />} />
                  <Route path="login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
      </Layout>
  );
}

export default App;
