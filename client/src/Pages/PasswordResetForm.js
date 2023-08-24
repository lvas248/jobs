import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { submitPasswordUpdate } from '../Redux/slices/userSlice'
import Alert from '../Components/Alert'

function PasswordResetForm() {

    const [ passwordObj, setPasswordObj ] = useState({
        password: '',
        password_confirmation: ''
    })
    const [ displayAlert, setDisplayAlert ] = useState(false)

    const history = useHistory()
    const { token } = useParams()
    const dispatch = useDispatch()
    const errors = useSelector(state => state.user.error)



    function updatePasswordObj(e){
        const copy = {...passwordObj}
        copy[e.target.name] = e.target.value
        setPasswordObj(copy)
    }

    function submitPasswordChange(e){
        e.preventDefault()
        dispatch(submitPasswordUpdate({token: token, passwordObj: passwordObj})).then(res => {
            if( res.meta.requestStatus === 'fulfilled'){
                setDisplayAlert(true)
                setTimeout(()=>{
                    history.push('/login')
                },3000)
            }
        })
    }

    return ( 
        <div className='grid pt-[15vh] px-5 w-[80vw] max-w-[600px] m-auto'>

            <form onSubmit={submitPasswordChange}>

                <Alert text='Password reset has been successful.  Redirecting...' display={displayAlert}/>

                <input type='password' placeholder='new password' name='password' value={passwordObj.password} onChange={updatePasswordObj}/>
                <input type='password' placeholder='confirm new password' name='password_confirmation' value={passwordObj.password_confirmation} onChange={updatePasswordObj} />
                <div><p className='error'>{errors?.errors}</p></div>
                <button>submit</button>

            </form> 

        </div>
        );
}

export default PasswordResetForm;