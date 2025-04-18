import './assets/styles/base.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Home from './pages/Home/Home';
import RecipientList from './pages/RecipientList/RecipientList';
import CreateRecipient from './pages/CreateRecipient/CreateRecipient';
import Recipient from './pages/Recipient/Recipient';
import MessageForm from './pages/MessageForm/MessageForm';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RecipientList />} />
        <Route path="/post" element={<CreateRecipient />} />
        <Route path="/post/:id" element={<Recipient />} />
        <Route path="/post/:id/message" element={<MessageForm />} />
      </Routes>
    </>
  );
}
