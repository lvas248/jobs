import Signup from './Pages/Signup';
import Login from './Pages/login';
import User from './Pages/Users/User'
import PasswordResetForm from './Pages/PasswordResetForm'
import PasswordResetRequest from './Pages/PasswordResetRequest'
import NavComponent from './Layout/NavComponent';
import Jobs from './Pages/Jobs/Jobs';

import { refreshSession } from './Redux/slices/sessionSlice';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { getJobs } from './Redux/slices/jobSlice'

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