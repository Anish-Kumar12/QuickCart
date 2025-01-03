import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import OtpVerification from '../pages/OtpVerification.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "/search",
                element : <Search/>
            },
            {
                path : "/login",
                element : <Login/>
            },
            {
                path : "/register",
                element : <Register/>
            },
            {
                path : "/forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "/verification-otp",
                element : <OtpVerification/>
            },
            {
                path : "/reset-password",
                element : <ResetPassword/>
            },
        ]
    }
]);

export default router;