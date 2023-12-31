import {  useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loginuser } from '../Redux/slices/sessionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { requestVerifyEmail } from '../Redux/slices/userSlice'
import LoadingIcon from '../Components/LoadingIcon'
import Alert from '../Components/Alert'

function Login() {

    const dispatch = useDispatch()
    const errors = useSelector( state => state.session.error)
    const userError = useSelector( state => state.user.error)
    const sessionStatus = useSelector( state => state.session.status)

    const history = useHistory()
  

    const [ loginObj, setLoginObj ] = useState({
        email: 'demo@gmail.com',
        password: 'password1'
    })
    const [ displayAlert, setDisplayAlert ] = useState({
        display: false,
        text: ''
    })

    function navigateTo(path){
        history.push(`/`+ path)
    }

    function updateLoginObj(e){
        const copy = {...loginObj}
        copy[e.target.name] = e.target.value
        setLoginObj(copy)
    }

    function submitLoginObj(e){
        e.preventDefault()
        dispatch(loginuser({...loginObj, email: loginObj.email.toLowerCase()})).then( res =>{
            if(res.meta.requestStatus === 'fulfilled') navigateTo('user')
        })
    }

    function requestEmailVerif(){
        dispatch(requestVerifyEmail({email: loginObj.email})).then(res => {
            if(res.meta.requestStatus === 'fulfilled'){
                setDisplayAlert({ text: 'An email has been sent with a verification link.  Click the link to proceed.', display: true })
                setTimeout(()=>{
                    setDisplayAlert({text:'', display: false})
                    setLoginObj({
                        email: '',
                        password: ''
                    })
                },4000)
            }
        })
    }


    return ( 


        <div className='grid pt-[15vh] px-5'>
            <form onSubmit={submitLoginObj} className='animate-fade-in relative m-auto w-[80vw] max-w-[600px]'>
                
                <Alert text={displayAlert.text} display={displayAlert.display}/>
                <LoadingIcon status={sessionStatus} />

                <input type='text' placeholder='email' name='email' value={loginObj.email} onChange={updateLoginObj}  />

                <p className='error'>{errors?.email}</p>

                <input type='password' placeholder='password' name='password' value={loginObj.password} onChange={updateLoginObj}  />
            
                <p className='error'>{errors?.error}</p>

                <div><button onClick={()=>navigateTo('forgot_password')} type='button' className='border-none text-sm text-blue-700 underline'>forgot password</button></div>

                <button className='bg-slate-200'>login</button>

                { errors?.email ? (
                    <div className=''>
                        <button type='button' onClick={requestEmailVerif}  className='border font-bold rounded p-[2px]'>VERIFY EMAIL</button>
                        <p className='error'>{userError?.error}</p>
                    </div>) : <p>New? Signup <button onClick={()=>navigateTo('signup')} type='button' className='border font-bold rounded p-[2px]'>here</button></p>
}                
            </form> 
        </div>
        );
}

export default Login;