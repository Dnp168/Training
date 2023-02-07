import './App.css';
import AddEmployee from './components/AddEmployee';
import EmployeeData from './components/EmployeeData';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditEmployee from './components/EditEmployee';
import Officedata from './components/Officedata';
import AddOffice from './components/AddOffice';
import EditOffice from './components/EditOffice';
import Hr from './components/Hr';
import HrUpdate from './components/HrUpdate';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< EmployeeData />}></Route>
          <Route exact path='/addEmployee' element={< AddEmployee />}></Route>
          <Route  path='/editEmployee' element={< EditEmployee />}></Route>
          <Route exact path='/office' element={< Officedata />}></Route>
          <Route exact path='/addOffice' element={< AddOffice />}></Route>
          <Route exact path='/editOffice' element={< EditOffice />}></Route>
          <Route exact path='/Hr' element={< Hr />}></Route>
          <Route exact path='/editHr' element={< HrUpdate />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
