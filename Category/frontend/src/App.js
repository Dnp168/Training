import './App.css';
import Category from './components/Category';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowCategory from './components/ShowCategory';

function App() {
  return (
    <div className="App">
      {/* <Category /> */}
      <Router>
        <Routes>
        <Route exact path='/' element={< Category />}></Route>
        <Route exact path='/category' element={< ShowCategory />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
