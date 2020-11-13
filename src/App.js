import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import './App.css';

import { ClientPage } from './ClientComponents/ClientPage'

function App() {

  // state to hold current logged in user, initial user object values
  const [currentUser, setCurrentUser] = useState({
      id: '',
      username: '',
      password: '',
      instructor: false
      
    });

  // function to get the current logged in user, passed as props to signup and login forms
  const getUser = (user) => {
    setCurrentUser(user);
  }

  return (
    <div className="App">
      Anywhere Fitness App
      {/* Routes */}
      <Switch>
        <Route path='/signup' render={()=> <SignUp getUser={getUser}/>}/>
        <Route path='/login' render={()=> <LogIn getUser={getUser}/>}/>
        <Route path='/clientPage' render={()=> <ClientPage getUser={getUser}/>}/>
      </Switch>
    </div>
  );
}

export default App;
