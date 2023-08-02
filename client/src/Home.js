import Signup from './Signup';
import Login from './login';
import User from './User'
import PasswordResetForm from './PasswordResetForm'
import PasswordResetRequest from './PasswordResetRequest'
import NavComponent from './NavComponent';
import Jobs from './Jobs';

import { refreshSession } from './features/sessionSlice';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from './features/jobsData/jobSlice'

function Home() {

  const dispatch = useDispatch()
  const user = useSelector( state => state.user)
  const savedJobs = useSelector( state => state.savedJob)

  console.log(user, savedJobs)

  useEffect(()=>{
    dispatch(getJobs())
  },[dispatch])

  useEffect(() => {
    dispatch(refreshSession())
  }, [dispatch]);


  return (
    <div>

        <NavComponent className='h-[10vh]'/>

        <div className=' h-[92vh] overflow-auto py-2 px-[10vw]'>

          <Switch>

            <Route  path='/forgot_password'>
              <PasswordResetRequest />
            </Route>

            <Route exact path='/password_reset/token/:token'>
              <PasswordResetForm />
            </Route>

            <Route path='/email_sent'>
              <h1>check your email for a confirmation link to complete sign up.</h1>
            </Route>

            <Route path='/login'>
              <Login />
            </Route>

            <Route path='/signup'>
              <Signup />
            </Route>

            <Route path='/user'>
              <User />
            </Route>

            <Route path='/'>
              <Jobs />
            </Route>

          </Switch>

        </div>

        


    </div>

  );
}


export default Home;