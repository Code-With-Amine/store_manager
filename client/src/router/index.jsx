import {createBrowserRouter} from 'react-router-dom';
import SignUp from '../layouts/SignUp'
import Dashbord from '../layouts/Dashborad';
import Login from '../layouts/Login';

export const router = createBrowserRouter([
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/dashbord/:email',
        element: <Dashbord />
    },
    {
        path: '*',
        element: <p>not Found</p>
    }
])