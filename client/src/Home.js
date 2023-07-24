import Signup from './Signup';
import Login from './login';
import User from './User'
import PasswordResetForm from './PasswordResetForm'
import PasswordResetRequest from './PasswordResetRequest'

import { logoutSession, refreshSession } from './features/sessionSlice';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';

function Home() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshSession())
    // .then(res => console.log(res))
  }, [dispatch]);

  function logoutUser(){
    dispatch(logoutSession()).then(res => console.log(res))
  }

  const user = useSelector(state => state.user)
  const session = useSelector(state => state.session)

  console.log(user,session)

  return (
    <div>
        <h1 className="text-3xl font-bold bg-slate-500 ">
          Hello world!
        </h1>

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

        </Switch>
        


        { session?.loggedIn && <button onClick={logoutUser}>logout</button>}
    </div>

  );
}


export default Home;