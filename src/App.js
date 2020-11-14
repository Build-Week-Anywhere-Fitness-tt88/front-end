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
    console.log('updating state with current user', user);
    const loggedInUser = {...currentUser,
      id: user.id,
      username: user.username,
      instructor: user.instructor
    }
    setCurrentUser(loggedInUser);
  }
 

  return (
    <div className="App">
      
      <Header currentUser={currentUser}/>

      {/* Routes */}
      <Switch>
        <Route path='/signup' render={()=> <SignUp currentUser={currentUser} getUser={getUser}/>}/>
        <Route path='/login' render={()=> <LogIn currentUser={currentUser} getUser={getUser}/>}/>
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
