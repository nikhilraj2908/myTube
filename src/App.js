import logo from './logo.svg';
import { Signupuser } from './components/signup-user/signup_user';
import './App.css';
import { Header } from './components/header/header';
import { Mainpage } from './components/main_page/main_page';
import { useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { Route, Routes } from 'react-router-dom';
import { Loginadmin } from './components/login_admin/login_admin';
import Adminpage from './components/admin_page/admin_page';
function App() {
  const [cookies, setcookie, removecookie] = useCookies(["userID"]);
  return (
    <div className='container-fluid'>
      <Routes>
        <Route path='/' element={cookies.userID ? <Mainpage /> : <Signupuser />} />
        <Route path='/home' element={cookies.userID ? <Mainpage /> : <Signupuser />} />
        <Route path='/login_admin' element={<Loginadmin />}></Route>
        <Route path='/adminpage' element={<Adminpage />}></Route>
      </Routes >
    </div>
  );
}

export default App;
