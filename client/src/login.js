import {  useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loginuser } from './features/sessionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { requestVerifyEmail } from './features/user/userSlice'

function Login() {

    const dispatch = useDispatch()
    const errors = useSelector( state => state.session.error)
    const userError = useSelector( state => state.user.error)
    const history = useHistory()
  
    console.log(userError)

    const [ loginObj, setLoginObj ] = useState({
        email: '',
        password: ''
    })

    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.name] = e.target.value
        setLoginObj(copy)
    }

    function submitLoginObj(e){
        e.preventDefault()
        dispatch(loginuser(loginObj))
    }

    function requestEmailVerif(){
        dispatch(requestVerifyEmail({email: loginObj.email})).then(res => {
            console.log(res)
            if(res.meta.requestStatus === 'fulfilled') history.push('/email_sent')
        })
    }


    return ( 
            <form onSubmit={submitLoginObj}>
                
                <input type='text' placeholder='email' name='email' value={loginObj.username} onChange={updateLoginObj}  />
                <p className='error'>{errors?.email}</p>
                <input type='password' placeholder='password' name='password' value={loginObj.password} onChange={updateLoginObj}  />
            
                <p className='error'>{errors?.error}</p>

                <button className='bg-slate-200'>login</button>


                

                { errors?.email ? (
                    <div className=''>
                        <button onClick={requestEmailVerif} type='button' className='border font-bold rounded p-[2px]'>VERIFY EMAIL</button>
                        <p className='error'>{userError?.error}</p>
                    </div>) : <p>New? Signup <button className='border font-bold rounded p-[2px]'>here</button></p>
}                
            </form> 
        );
}

export default Login;