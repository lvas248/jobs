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
        dispatch(logoutSession()).then(res => console.log(res))
        toggleMenu()
      }

    return ( 

        <div>

            <nav className=' bg-slate-200'>

                <div className='flex justify-between'>

                    <h1 className='text-xl m-4'>NYC Job Hunt</h1>

                    <div className='flex hidden sm:block p-6'>
    
                        <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='/jobs'>NYC Jobs</NavLink>

                        <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='user'>User</NavLink>

                        { loggedIn ? <NavLink onClick={logoutUser} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='login'>Logout</NavLink>: (
                            <>
                                <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='signup'>Signup</NavLink>
                                <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='login'>Login</NavLink>
                            </>

                        ) }

                    </div>

                    <img onClick={()=> setNavbarToggle(!navbarToggle)} src={menu} alt='menu' className='w-10 sm:hidden m-4'/>
                
                </div>

                <div className={`absolute w-full z-10 flex flex-col sm:hidden ${navbarToggle ? '':'hidden'}`}>
    
                    <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='jobs'>NYC Jobs</NavLink>

                    <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='user'>User</NavLink>
                    { loggedIn ? <NavLink onClick={logoutUser} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='login'>Logout</NavLink>: (
                            <>
                            <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='signup'>Signup</NavLink>
                            <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='login'>Login</NavLink>
                        </>
                ) }
                
                </div>
                    
            </nav>




        </div>
   

    );
}

export default NavComponent ;