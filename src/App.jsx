import './assets/styles/base.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import RecipientList from './pages/RecipientList/RecipientList';
import Home from './pages/Home/Home';
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
        <Route path="/post/:id" element={<Recipient showDelete={false} />} />
        <Route
          path="/post/:id/edit"
          element={<Recipient showDelete={true} />}
        />
        <Route path="/post/:id/message" element={<MessageForm />} />
      </Routes>
    </>
  );
}
