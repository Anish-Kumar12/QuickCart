import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';

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
            }
        ]
    }
]);

export default router;