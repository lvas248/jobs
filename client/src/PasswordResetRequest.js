import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { requestPasswordReset } from './features/user/userSlice';

function PasswordResetRequest() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [ email, setEmail ] = useState('')

    function navigateTo(path){
        history.push('/'+path)
    }
    function submitRequest(e){
        e.preventDefault()
        dispatch(requestPasswordReset({email: email})).then(res => {
            if(res.meta.requestStatus === 'fulfilled') navigateTo('email_sent')
        })
    }

    return ( 
        <form onSubmit={submitRequest}>
            <input placeholder="email address..." value={email} onChange={e=>setEmail(e.target.value)} />
            <button>submit</button>
        </form> );
}

export default PasswordResetRequest;