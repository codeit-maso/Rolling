import './assets/styles/base.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Home from './pages/Home/home';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
