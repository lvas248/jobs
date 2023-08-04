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

import { useDispatch } from 'react-redux';
import { getJobs } from './features/jobsData/jobSlice'

function Home() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getJobs())
  },[dispatch])

  useEffect(() => {
    dispatch(refreshSession())
  }, [dispatch]);


  return (
    <div>

        <NavComponent />

        <div className=' h-[91vh] overflow-auto py-2 px-[10vw]'>

          <Switch>

            <Route  path='/forgot_password'>
              <PasswordResetRequest />
            </Route>

            <Route exact path='/password_reset/token/:token'>
              <PasswordResetForm />
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