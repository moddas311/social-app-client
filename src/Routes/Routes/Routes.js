import { createBrowserRouter } from "react-router-dom";
import About from "../../components/pages/About/About";
import Home from "../../components/pages/Home/Home";
import Login from "../../components/pages/Login/Login";
import Register from "../../components/pages/Login/Register/Register";
import Media from "../../components/pages/Media/Media";
import Message from "../../components/pages/Message/Message";
import Main from "../../Layout/Main";

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
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/media',
                element: <Media />
            },
            {
                path: '/message',
                element: <Message />
            },
            {
                path: '/about',
                element: <About />
            },
        ],
    },
]);

export default router;