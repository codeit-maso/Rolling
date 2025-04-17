import "./base.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Test from './pages/List-page/Test';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Test/>}/>
      </Routes>
    </>
  );
}

export default App;
