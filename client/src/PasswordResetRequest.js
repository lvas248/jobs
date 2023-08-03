import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from './features/user/userSlice';

function PasswordResetRequest() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [ email, setEmail ] = useState('')
    const error = useSelector(state => state.user.error)
    
    function navigateTo(path){
        history.push('/'+path)
    }
    function submitRequest(e){
        e.preventDefault()
        dispatch(requestPasswordReset({email: email.toLowerCase()})).then(res => {
            if(res.meta.requestStatus === 'fulfilled') navigateTo('email_sent')
        })
    }

    return ( 
        <form onSubmit={submitRequest} className='animate-fade-in'>
            <input placeholder="email address..." value={email} onChange={e=>setEmail(e.target.value)} />
            <button>submit</button>
            <p className='error'>{error?.error}</p>
        </form> 
        );
}

export default PasswordResetRequest;