import './App.css';

import VerifyEmail from './VerifyEmail';
import Home from './Home';
import { Switch, Route } from 'react-router-dom'

function App() {

  
 

  return (
    <div className='h-screen'>

        <Switch>

          <Route exact path='/email_verification/token/:token'>
             <VerifyEmail />
          </Route>

          <Route path='/'>
            <Home />
          </Route>

        </Switch>
        
    </div>

  );
}

export default App;
