import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import SampleClasses from './components/SampleClasses';
import './App.css';

import { ClientPage } from './ClientComponents/ClientPage'
import { InstructorPage } from './InstructorComponents/InstructorPage';


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
      
      <Header currentUser={currentUser}/>

      {/* Routes */}
      <Switch>
        <Route path='/signup' render={()=> <SignUp getUser={getUser}/>}/>
        <Route path='/login' render={()=> <LogIn getUser={getUser}/>}/>
        <Route path='/sampleclasses' component={SampleClasses} />

        {/* Will change later to private routes once authentication token is finished */}
        <Route path='/clientPage' render={()=> <ClientPage getUser={getUser}/>}/>
        <Route path='/instructorPage' render={()=> <InstructorPage getUser={getUser}/>}/>

      </Switch>

      <Footer />
    </div>
  );
}

export default App;
