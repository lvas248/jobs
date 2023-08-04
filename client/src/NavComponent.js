import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import menu from './media-icons/menu.png'
import { useSelector, useDispatch } from 'react-redux';
import { logoutSession } from './features/sessionSlice';


function NavComponent() {

    const loggedIn = useSelector(state => state.session.loggedIn)
    const dispatch = useDispatch()

    const [ navbarToggle, setNavbarToggle ] = useState(false)

    function toggleMenu(){
        setNavbarToggle(!navbarToggle)
    }
    function logoutUser(){
        dispatch(logoutSession())
        toggleMenu()
      }

    return ( 

            <nav className='bg-slate-200 grid '>

                <div className='flex justify-between items-center'>

                    <h1 className='text-xl m-4'>NYC Job Hunt</h1>

                    <div className='hidden sm:block p-6'>
    
                        <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/'>All Jobs</NavLink>

                        { loggedIn ?(
                        <>
                            <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/user'>User</NavLink>
                            <NavLink onClick={logoutUser} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/login'>Logout</NavLink>
                        </> ): (
                        <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/login'>Login</NavLink>
                ) }

                    </div>

                    <img onClick={()=> setNavbarToggle(!navbarToggle)} src={menu} alt='menu' className='w-10 sm:hidden m-4'/>
                
                </div>

                <div className={`absolute w-full top-[7vh] z-20 flex flex-col sm:hidden ${navbarToggle ? '':'hidden'}`}>
    
                    <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/'>Jobs</NavLink>

                    { loggedIn ?(
                        <>
                            <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/user'>User</NavLink>
                            <NavLink onClick={logoutUser} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/login'>Logout</NavLink>
                        </> ): (
                        <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/login'>Login</NavLink>
                ) }
                
                </div>
                    
            </nav>

    );
}

export default NavComponent ;