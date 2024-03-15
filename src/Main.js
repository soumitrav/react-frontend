import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import TextSender from './TextSender';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

function Main() {
  // ... your existing App component logic

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;