import './assets/styles/base.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Test from './pages/List-page/Test';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </>
  );
}
