import {BrowserRouter as Router,Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Container } from 'semantic-ui-react'
import Home from './components/pages/Home';
import Register  from './components/pages/Register';
import Login from './components/pages/Login';
import Menu from './components/Menu';
import {AuthProvider} from './context/auth';
import AuthRoute from './utils.js/AuthRoute';
import SinglePost from './components/pages/SinglePost';
function App() {
  return (
   <AuthProvider>
      <Router>
    <Container>
      <Menu></Menu>
      <Route exact path='/' >
      <Home/>
      </Route>
      <AuthRoute exact path='/login' component={Login}/>
      <AuthRoute exact path='/register' component={Register}/>
      <Route exact path='/posts/:postId' component={SinglePost}></Route>
      </Container>
    </Router>
   </AuthProvider>
  );
}

export default App;
