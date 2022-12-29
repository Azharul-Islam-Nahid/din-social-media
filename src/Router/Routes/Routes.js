import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import About from "../../Pages/About/About";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Media from "../../Pages/Media/Media";
import PostDetails from "../../Pages/Media/PostDetails";
import Message from "../../Pages/Message/Message";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/message',
                element: <PrivateRoute><Message /></PrivateRoute>
            },
            {
                path: '/media',
                element: <Media />
            },
            {
                path: '/postdetails/:id',
                element: <PrivateRoute><PostDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/userpost/${params.id}`)
            },
            {
                path: '/about',
                element: <PrivateRoute><About /></PrivateRoute>
            }
        ]
    }
])

export default router;