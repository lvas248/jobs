import './App.css';
import Signup from './Signup';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state => state.user)

  console.log(user)

  return (
    <div>
        <h1 className="text-3xl font-bold bg-slate-500 ">
          Hello world!
        </h1>

        <Signup />
    </div>

  );
}

export default App;
