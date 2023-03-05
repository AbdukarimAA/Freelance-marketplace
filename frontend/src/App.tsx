import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import './index.scss';
import SuccessPay from "./pages/successPay/SuccessPay";
import Payment from "./pages/payment/Payment";

function App() {
    const queryClient = new QueryClient()

    const Layout = () => {
        return (
            <div className='app'>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </QueryClientProvider>
            </div>
        )
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
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
                    path: '/gigs',
                    element: <Gigs />
                },
                {
                    path: '/gig/:id',
                    element: <Gig />
                },
                {
                    path: '/orders',
                    element: <Orders />
                },
                {
                    path: '/myGigs',
                    element: <MyGigs />
                },
                {
                    path: '/add',
                    element: <Add />
                },
                {
                    path: '/messages',
                    element: <Messages />
                },
                {
                    path: '/message/:id',
                    element: <Message />
                },
                {
                    path: '/success',
                    element: <SuccessPay />
                },
                {
                    path: '/pay/:id',
                    element: <Payment />
                }
            ]
        },
    ]);

  return <RouterProvider router={router} />
}

export default App
