import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSession } from '../Redux/slices/sessionSlice';
import menu from '../Assets/menu.png'

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

            <nav className='bg-slate-500 grid drop-shadow text-green-600 font-bold w-full absolute top-0 z-20 '>

                <div className='flex justify-between items-center'>

                    <NavLink to='/'><h1 className='text-xl m-4 text-white'>NYC Job Hunt</h1></NavLink>

                    <div className='hidden sm:block p-6 text-green-600'>
    
                        <NavLink activeClassName='underline bg-slate-300 rounded-2xl' className='p-6 hover:underline hover:bg-slate-300 hover:rounded-2xl ' exact to='/'>All Jobs</NavLink>

                        { loggedIn ?(
                        <>
                            <NavLink onClick={toggleMenu} activeClassName='underline bg-slate-300 rounded-2xl' className='p-6 hover:underline hover:bg-slate-300 hover:rounded-2xl ' to='/user'>User</NavLink>
                            <NavLink onClick={logoutUser} activeClassName='underline bg-slate-300 rounded-2xl' className='p-6 hover:underline hover:bg-slate-300 hover:rounded-2xl' to='/login'>Logout</NavLink>
                        </> ): (
                        <NavLink onClick={toggleMenu} activeClassName='underline bg-slate-300 rounded-2xl' className='p-6 hover:underline hover:bg-slate-300 hover:rounded-2xl' to='/login'>Login</NavLink>
                ) }

                    </div>

                    <img onClick={()=> setNavbarToggle(!navbarToggle)} src={menu} alt='menu' className='w-10 sm:hidden m-4'/>
                
                </div>

                <div className={`flex flex-col bg-slate-500 h-fit sm:hidden ${navbarToggle ? '':'hidden'}`}>
    
                    <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300' to='/'>Jobs</NavLink>

                    { loggedIn ?(
                        <>
                            <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300' to='/user'>User</NavLink>
                            <NavLink onClick={logoutUser} className='p-6 hover:underline hover:bg-slate-300' to='/login'>Logout</NavLink>
                        </> ): (
                        <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300' to='/login'>Login</NavLink>
                ) }
                
                </div>
                    
            </nav>

    );
}

export default NavComponent ;