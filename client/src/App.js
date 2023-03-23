// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';


import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from './components/BasicExample';
import { CarouselItems } from './components/CarouselItems/CarouselItems';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Logout } from './components/Logout/Logout';
import { AddTool } from './components/Tool/AddTool'

function App() {

    const contextValues = {
        // onLoginSubmit,
        // onRegisterSubmit,
        // onLogout,
        // userId: auth._id,
        // token: auth.accessToken,
        // userEmail: auth.email,
        // isAuthenticated: !!auth.accessToken,
    };

    return (
                <BrowserRouter>
        <AuthProvider> 
            <BasicExample />
            <Routes>
                <Route path='/' element={<CarouselItems/>} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/register' element={<Register />} />
                <Route path='/add-tool' element={<AddTool />} />
            </Routes>
        </AuthProvider>
            </BrowserRouter>
    );
}

export default App;
