import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import Orders from './pages/Orders';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<Resetpassword />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='orders' element={<Orders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
