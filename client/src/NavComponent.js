import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import menu from './media-icons/menu.png'

function NavComponent() {

    const [ navbarToggle, setNavbarToggle ] = useState(false)

    function toggleMenu(){
        setNavbarToggle(!navbarToggle)
    }

    return ( 
        // <div className=''>

        //     <nav className="flex text-white fixed w-full items-center justify-between flex-wrap bg-teal-500 p-6">
                
        //         <h1 className='text-xl'>AppName</h1>

        //         {/* <div className={`hidden sm:block`}> */}
        //         <div className={`absolute text-black bottom-[-20px]  `}>
 
        //             <NavLink className='p-6 hover:underline' to='login'>Login</NavLink>
        //             <NavLink className='p-6 hover:underline' to='signup'>Signup</NavLink>
        //             <NavLink className='p-6 hover:underline' to='user'>User</NavLink>

        //         </div>

        //         <img onClick={()=> setNavbarToggle(!navbarToggle)}className='w-10 float-right block sm:hidden hover:cursor-grab' src={menu} alt='menu' />  

        //     </nav>   

        
        <div>

            <nav className=' bg-slate-200'>

                <div className='flex justify-between'>

                    <h1 className='text-xl m-4'>AppName</h1>

                    <div className='flex hidden sm:block p-6'>
    
                        <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='login'>Login</NavLink>
                        <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='signup'>Signup</NavLink>
                        <NavLink className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='user'>User</NavLink>

                    </div>

                    <img onClick={()=> setNavbarToggle(!navbarToggle)} src={menu} alt='menu' className='w-10 sm:hidden m-4'/>
                
                </div>

                <div className={`absolute w-full z-10 flex flex-col sm:hidden ${navbarToggle ? '':'hidden'}`}>
    
                    <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='login'>Login</NavLink>
                    <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='signup'>Signup</NavLink>
                    <NavLink onClick={toggleMenu} className='p-6 hover:underline hover:bg-slate-300 bg-slate-200' to='user'>User</NavLink>

                </div>
                    
            </nav>




        </div>
   

    );
}

export default NavComponent ;