import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

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
            }
        ]
    }
]);

export default router;