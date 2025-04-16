import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./components/common/Header";
import "./base.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header></Header>
      </div>
      <Link to="/list"><div>구경해보기</div></Link> 
    </BrowserRouter>
    
  );
}

export default App;
