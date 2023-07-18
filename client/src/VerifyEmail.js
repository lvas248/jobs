import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { submitToken, requestVerifyEmail } from './features/user/userSlice'

function VerifyEmail() {

    const { token } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const [ emailSent, setEmailSent ] = useState(false)

    const user = useSelector(state => state.user)
    

    useEffect(() => {
       
        dispatch(submitToken({token: token})).then(res =>{
            if(res.meta.requestStatus === 'fulfilled'){
                history.push('/user')
            }
        })
    }, [dispatch,token]);

    function requestVerificationEmail(){
        //create and dispatch async that fetche requests new verification
        dispatch(requestVerifyEmail()).then(res => {
            if(res.meta.requestStatus === 'fulfilled'){
                setEmailSent(true)
            }
        })
    }


    return ( 
        <div className='grid place-content-center p-5 text-center'>

            { emailSent ? <p>Email has been sent</p> : null}
            { user.status === 'pending' && 'verifying email...'}

            { user?.error && (
                <>
                    <p className='error'>{user.error.error}</p>
                    <button onClick={requestVerificationEmail}> request another verification email </button>
                </>
            )}

        </div>
        );
}

export default VerifyEmail;