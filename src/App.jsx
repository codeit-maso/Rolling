import './assets/styles/base.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import RecipientList from './pages/RecipientList/RecipientList';
import Home from './pages/Home/home';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RecipientList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
