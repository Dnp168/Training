import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Register from './components/register';
import Login from './components/login';
import Product from './components/Product';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/Register' element={< Register />}></Route>
          <Route exact path='/Login' element={< Login />}></Route>
          <Route exact path='/product' element={< Product />}></Route>
          <Route exact path='/profile' element={< Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
