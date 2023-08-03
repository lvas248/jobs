import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { signupUser, resetErrors } from './features/sessionSlice'
import LoadingIcon from './LoadingIcon'

function Signup() {

 
    const dispatch = useDispatch()
    const errors = useSelector( state => state.session.error)
    const sessionStatus = useSelector( state => state.session.status)
    const history = useHistory()

    useEffect(()=>{
        return ()=>{
            dispatch(resetErrors())
        }
    },[dispatch])
    
    const [ signupObj, setSignupObj ] = useState({
        email: '',
        password: '',
        password_confirmation: ''    
    })

    function navigateTo(path){
        history.push('./'+ path)
    }

    function updateSignupObj(e){
        const copy = {...signupObj}
        copy[e.target.name] = e.target.value
        setSignupObj(copy)
    }

    function submitSignup(e){
        e.preventDefault()
        dispatch(signupUser({...signupObj, email: signupObj.email.toLowerCase()})).then( res=>{
            if(res.meta.requestStatus === 'fulfilled'){        
                setSignupObj({
                    email: '',
                    password: '',
                    password_confirmation: ''    
                })
                navigateTo('email_sent')
            }
            setSignupObj({...signupObj, password: '', password_confirmation: ''})

        })


    }

    const renderPasswordErrors = errors?.password?.map( e =>{
         return <p className='error my-1' key={e}>Password {e}</p>
        })

    const renderEmailErrors = errors?.email?.map( e =>{
        return <p className='error my-1' key={e}>Email {e}</p>
        })

    const renderPasswordConfirmationErrors = errors?.email?.map( e =>{
        return <p className='error my-1' key={e}>Confirmation {e}</p>
        })




    return ( 
        <form className='animate-fade-in'>

            <LoadingIcon status={sessionStatus} />

            <input type='email' name='email' placeholder='email' value={signupObj.email} onChange={updateSignupObj}/>
            
            { renderEmailErrors }

            <input type='password' name='password' placeholder='password' value={signupObj.password} onChange={updateSignupObj}/>
            
            { renderPasswordErrors }

            <input type='password' name='password_confirmation' placeholder='password_confirmation' value={signupObj.password_confirmation} onChange={updateSignupObj}/>
            
            { renderPasswordConfirmationErrors }

            <button
                className='bg-slate-200'
                onClick={submitSignup}
            >sign up</button>

            <div>
               <p>Back to <button onClick={()=>navigateTo('login')} type='button' className='border font-bold rounded p-[2px]'>Login</button></p>            
                </div>
         
        </form>
     );
}

export default Signup;