import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import App from './app.routes';
import Auth from './auth.routes';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => {

    const { logged } = useAuth();

    function GetPage() {
        if (logged) {
            return <App />
        } else if (window.location.pathname.includes('signin')) {
            return <SignIn />
        } else if (window.location.pathname.includes('signup')) {
            return <SignUp />
        } else {
            return <Auth />
        }
        //{ logged ? <App /> : <Auth />}
        //{ logged ? <App /> : <SignUp />}
    }

    return (
        <BrowserRouter>
            <GetPage />
        </BrowserRouter>
    )
};

export default Routes;