import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { submitToken, requestVerifyEmail } from './features/user/userSlice'
import LoadingIcon from './LoadingIcon'
import Alert from './Alert'

function VerifyEmail() {

    const { token } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()


    const user = useSelector(state => state.user)
    const [ displayAlert, setDisplayAlert ] = useState(false)

    useEffect(() => {
       
        dispatch(submitToken({token: token})).then(res =>{
            if(res.meta.requestStatus === 'fulfilled'){
                setDisplayAlert(true)
                setTimeout(()=>{
                    history.push('/')                    
                }, 3000)

            }
        })
    }, [dispatch,token, history]);

    function requestVerificationEmail(){
        //create and dispatch async that fetche requests new verification
        dispatch(requestVerifyEmail()).then(res => {
            if(res.meta.requestStatus === 'fulfilled'){
                history.push('/email_sent')
            }
        })
    }


    return ( 
        <div className='grid place-content-center p-5 text-center'>

            <LoadingIcon status={user.status} />

            <Alert text='Congrats! Your email has been confirmed. Redirecting to jobs...' display={displayAlert}/>

            { user?.error && (
                <>
                    <p className='error'>{user.error.error}</p>
                    <button onClick={requestVerificationEmail}> request another verification email </button>
                </>
            ) }

        </div>
        );
}

export default VerifyEmail;