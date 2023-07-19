import Signup from './Signup';
import Login from './login';
import VerifyEmail from './VerifyEmail';
import User from './User'

import { logoutSession, refreshSession } from './features/sessionSlice';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux';

function Home() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshSession())
  }, [dispatch]);

  function logoutUser(){
    dispatch(logoutSession()).then(res => console.log(res))
  }

  const user = useSelector(state => state.user)
  const session = useSelector(state => state.session)

  console.log(user)

  return (
    <div>
        <h1 className="text-3xl font-bold bg-slate-500 ">
          Hello world!
        </h1>
        <Switch>

          <Route exact path='/'>
            <Login />
          </Route>

          <Route path='/signup'>
            <Signup />
          </Route>

          <Route  path='/email_verification/token/:token'>
             <VerifyEmail />
          </Route>

          <Route  path='/user'>
             <User />
          </Route>

          <Route path='/email_sent'>
            <h1>check your email for a confirmation link to complete sign up.</h1>
          </Route>

        </Switch>
        


        { session?.loggedIn && <button onClick={logoutUser}>logout</button>}
    </div>

  );
}


export default Home;