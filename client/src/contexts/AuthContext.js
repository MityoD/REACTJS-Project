import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { login, logout, register } from '../services/userService';
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const [toastList, setToastList] = useState({});
    const displayToast = (data) => {
        setToastList(data);
    }


    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {

        const result = await login(data);
        if (!result.message) {
            setAuth(result);
            displayToast({ title: `${result.email.split('@')[0].toUpperCase()} welcome to Solar Solutions`, show: true, bg: 'success' });
            navigate('/');
        } else {
            displayToast({ title: `${result.message}`, show: true, bg: 'danger' });
        }
    };

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            displayToast({ title: "Password fields don't match", show: true, bg: 'danger' });
            return;
        }

        if (registerData.password.length < 4) {
            displayToast({ title: "Password must be 4 symbols or more!", show: true, bg: 'danger' });
            return;
        }

        const result = await register(registerData);

        if (result.email) {
            setAuth(result);

            displayToast({ title: `${result.email.split('@')[0].toUpperCase()} welcome to Solar Solutions`, show: true, bg: 'secondary' });
            navigate('/');
        } else {
            displayToast({ title: `${result.message}`, show: true, bg: 'danger' });

        }

    };
    const onLogout = async () => {
        await logout(auth.accessToken);        
        setAuth({});
        displayToast({ title: "Signed out!", show: true, bg: 'secondary' });

    };


    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        role: auth.role,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
        toastList,
        displayToast,
    };


    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};