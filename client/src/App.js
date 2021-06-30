import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Homepage from './homepage'
import Menus from './Menus'
import Navbars from './Navbar'
import Signup from './SingUp'
import Signin from './Signin'
import Display from './Display'
import Dashboard from './Dashboard'
import Displaycont from './Displaycont';
import { BrowserRouter as Router , Switch , Route , Link} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App" >
        <Navbars />
    <Switch>
    <Route path="/" exact component={Homepage} />
    <Route path="/menu" exact component={Menus} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/signin" exact component={Signin} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/display" exact component={Display} />
    <Route path="/displaycont" exact component={Displaycont} />
    <Homepage />
    </Switch>
    </div>
    </Router>
  );
}

export default App;
