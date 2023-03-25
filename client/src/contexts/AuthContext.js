import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

// import { authServiceFactory } from '../services/authService';
import { login , logout, register, addTool} from '../services/userService';


export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    // const authService = authServiceFactory(auth.accessToken)

    const onLoginSubmit = async (data) => {
        try {
            const result = await login(data);

            setAuth(result);

            navigate('/');
        } catch (error) {
            console.log('There is a problem');
        }
    };

    const onRegisterSubmit = async (values) => {
        const { confirmPassword, ...registerData } = values;
        if (confirmPassword !== registerData.password) {
            return;
        }

        try {
            const result = await register(registerData);

            setAuth(result);

            navigate('/');
        } catch (error) {
            console.log('There is a problem');
        }
    };
    const onLogout = async () => {
        await logout(auth.accessToken);

        setAuth({});
    };

    const onAddToolSubmit = async (data) => {
        try {
            const result = await addTool('/tools', data, auth.accessToken);

            //setAuth(result);

            navigate('/tools/my-tools');
        } catch (error) {
            console.log('There is a problem');
        }
    };

    
 
    


    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onAddToolSubmit,
        userId: auth._id,
        token: auth.accessToken,
        role: auth.role,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
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