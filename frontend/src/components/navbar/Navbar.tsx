import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import newRequest from '../../utils/axiosRequest';
import './Navbar.scss';


const Navbar = () => {
    const [active, setActive] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const {pathname} = useLocation();
    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive)

        return () => {
            window.removeEventListener("scroll", isActive)
        }
    }, []);

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || null);

    // const currentUser = localStorage.getItem('currentUser'); //JSON.parse(localStorage.getItem('currentUser'));
    // if(typeof currentUser === 'string') {
    //     const parse = JSON.parse(currentUser);
    // }



    const handleLogout = async () => {
        try {
            await newRequest.post('auth/logout');
            localStorage.setItem('currentUser', null);
            navigate('/')
        } catch (e: any) {
            console.log(e);
        }
    };


    return (
        <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
            <div className="container">
                <div className="logo">
                    <Link to='/' className='link'>
                        <span className='navbar-logo-text'>Job-Seeker</span>
                    </Link>
                </div>
                <div className="links">
                    <span>Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {currentUser ? (
                        <div className="user" onClick={() => setOpen(!open)}>
                            <img src={currentUser.img || "/img/rango.png"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && (
                                <div className="options">
                                    {currentUser.isSeller && (
                                        <>
                                            <Link className="link" to="/myGigs">Gigs</Link>
                                            <Link className="link" to="/add">Add New Gig</Link>
                                        </>
                                    )}
                                    <Link className="link" to="/orders">Orders</Link>
                                    <Link className="link" to="/messages">Messages</Link>
                                    <Link className="link" onClick={handleLogout} to=''>Logout</Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="link">Sign in</Link>
                            <Link className="link" to="/register"><button>Join</button></Link>
                        </>
                    )}
                </div>
            </div>
            { (active || pathname !== '/') && (
                <>
                    <hr/>
                    <div className="menu">
                        <Link className="link menuLink" to="/">
                            Graphics & Design
                        </Link>
                        <Link className="link menuLink" to="/">
                            Video & Animation
                        </Link>
                        <Link className="link menuLink" to="/">
                            Writing & Translation
                        </Link>
                        <Link className="link menuLink" to="/">
                            AI Services
                        </Link>
                        <Link className="link menuLink" to="/">
                            Digital Marketing
                        </Link>
                        <Link className="link menuLink" to="/">
                            Music & Audio
                        </Link>
                        <Link className="link menuLink" to="/">
                            Programming & Tech
                        </Link>
                        <Link className="link menuLink" to="/">
                            Business
                        </Link>
                        <Link className="link menuLink" to="/">
                            Lifestyle
                        </Link>
                    </div>
                    <hr/>
                </>
            )}
        </div>
    );
};

export default Navbar;