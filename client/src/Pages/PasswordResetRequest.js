import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../Redux/slices/userSlice';
import Alert from '../Components/Alert';

function PasswordResetRequest() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [ email, setEmail ] = useState('')
    const [ displayAlert, setDisplayAlert ] = useState(false)

    const error = useSelector(state => state.user.error)
    
    function navigateTo(path){
        history.push('/'+path)
    }
    function submitRequest(e){
        e.preventDefault()
        dispatch(requestPasswordReset({email: email.toLowerCase()})).then(res => {
            if(res.meta.requestStatus === 'fulfilled'){
                setDisplayAlert(true)
                setTimeout(()=>{
                    navigateTo('login')
                }, 4000)
            }
        })
    }

    return ( 

        <div className='pt-[15vh]'>
            <form onSubmit={submitRequest} className='animate-fade-in m-auto w-[80vw] max-w-[600px]'>
                <Alert text='A password reset link has been sent to the entered email.' display={displayAlert}/>
                <input placeholder="email address..." value={email} onChange={e=>setEmail(e.target.value)} />
                <button>submit</button>
                <p className='error'>{error?.error}</p>
            </form> 

        </div>
        );
}

export default PasswordResetRequest;