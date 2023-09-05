import VerifyEmail from './Pages/VerifyEmail';
import Home from './Home';
import { Switch, Route } from 'react-router-dom'

function App() {

  
 

  return (
    <div id='App' className='h-[100svh]'>

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
