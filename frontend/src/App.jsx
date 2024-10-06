import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Chat, NotFound } from './pages';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
