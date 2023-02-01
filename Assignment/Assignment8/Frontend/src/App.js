import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login';
import Register from './components/register';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/Register' element={< Register />}></Route>
          <Route exact path='/Login' element={< Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
