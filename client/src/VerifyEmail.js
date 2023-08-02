import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { submitToken, requestVerifyEmail } from './features/user/userSlice'

function VerifyEmail() {

    const { token } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()


    const user = useSelector(state => state.user)
    

    useEffect(() => {
       
        dispatch(submitToken({token: token})).then(res =>{
            if(res.meta.requestStatus === 'fulfilled'){
                history.push('/')
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