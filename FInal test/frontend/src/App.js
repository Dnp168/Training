import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import UserData from "./components/UserData";
import ViewData from "./components/ViewData";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< UserData />}></Route>
          <Route exact path='/addUser' element={<AddUser/>}></Route>
          <Route exact path='/view' element={<ViewData/>}></Route>
          <Route exact path='/edit' element={<EditUser/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
