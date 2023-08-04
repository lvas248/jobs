import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { submitToken, requestVerifyEmail } from '../Redux/slices/userSlice'
import LoadingIcon from '../Components/LoadingIcon'
import Alert from '../Components/Alert'

function VerifyEmail() {

    const { token } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()


    const user = useSelector(state => state.user)
    const [ displayAlert, setDisplayAlert ] = useState({ display: false, text: ''})

    useEffect(() => {
       
        dispatch(submitToken({token: token})).then(res =>{
            if(res.meta.requestStatus === 'fulfilled'){
                setDisplayAlert({display: true, text: 'Congrats! Your email has been confirmed. Redirecting to jobs...'})
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
                setDisplayAlert({display: true, text: 'An email has been sent with a verification link.  Click link to proceed.  Redirecting...'})
                setTimeout(()=>{
                    history.push('/login')                    
                }, 3000)
            }
        })
    }


    return ( 
        <div className='grid place-content-center p-5 text-center'>

            <LoadingIcon status={user.status} />

            <Alert text={displayAlert.text} display={displayAlert.display}/>

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