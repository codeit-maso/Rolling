import './assets/styles/base.scss';
import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import UploadProgressBar from './components/common/UploadProgressBar';
import Header from './components/layout/Header/Header';

const RecipientList = lazy(() => import('./pages/RecipientList/RecipientList'));
const Home = lazy(() => import('./pages/Home/Home'));
const CreateRecipient = lazy(
  () => import('./pages/CreateRecipient/CreateRecipient'),
);
const Recipient = lazy(() => import('./pages/Recipient/Recipient'));
const MessageForm = lazy(() => import('./pages/MessageForm/MessageForm'));

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<UploadProgressBar progress={80} />}>
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
      </Suspense>
    </>
  );
}
