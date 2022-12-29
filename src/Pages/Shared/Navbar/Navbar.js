import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../Components/UseLoader/Loading';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Navbar = () => {

    const { user, logOut, userData, isLoading } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }

    const menuItems = <React.Fragment>
        {user?.email ?
            <>
                <li><Link to="/media">Media</Link></li>
                <li><Link to="/message">Message</Link></li>
                <li><Link to="/about">About</Link></li>
                <li onClick={handleLogOut}><Link>Logout</Link></li>
            </>
            :
            <>
                <li><Link to="/media">Media</Link></li>
                <li><Link to="/message">Message</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </>
        }
    </React.Fragment>

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="navbar bg-emerald-400">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost normal-case text-xl">Din Social Media</Link>
            </div>
            <div className="navbar-start hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="lg:hidden btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {menuItems}
                </ul>
            </div>
            <div className="flex-none">

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        {
                            userData.map(userInfo => <div
                                key={userInfo?._id}
                                className="w-10 rounded-full">
                                {
                                    user?.email &&
                                    <img alt='user' src={userInfo?.image} />
                                }
                            </div>)
                        }

                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link to='/about' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link>Settings</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;