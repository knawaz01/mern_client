import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Navbar from './component/Navbar';
import Home from './component/Home';
import Register from './component/Register';
import Edit from './component/Edit';
import {Route,Routes} from 'react-router-dom'
import Detail from './component/Detail';
function App() {
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/register' element={<Register/>}/> 
      <Route exact path='/edit/:id' element={<Edit/>}/> 
      <Route exact path='/view/:id' element={<Detail/>}/> 
    </Routes>
    </>
  );
}
export default App;
