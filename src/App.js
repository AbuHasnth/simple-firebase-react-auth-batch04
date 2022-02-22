import logo from './logo.svg';
import './App.css';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, GoogleAuthProvider, getAuth, sendEmailVerification   } from "firebase/auth";
import initilizeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';

initilizeAuthentication();
const auth = getAuth();
const provider = new GoogleAuthProvider();


function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const registerNewUser = (email, password) =>{
    createUserWithEmailAndPassword(auth, email, password)
  .then((result=>{
    console.log(result.user)
    setError('')
  }))
  .catch((error =>{
    setError(error.message)
  }))
  }
  


const handleRegistration = (e) =>{
  e.preventDefault();
  if(password.length < 6){
    setError('password must be at least 6 characters');
    return;
  }
  if(!/.*[A-Z].*[A-Z]/.test(password)){
    setError('Password must contain 2 uppercase');
    return;
  }
  console.log('registration will be added')
  emailVerification();
  const processLogin = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((result=>{
      const user = result.user;
      console.log(user);
    }))
    .catch((error=>{
      setError(error.message)
    }))
    setError('')
  }

  isLogin? processLogin(email, password) : registerNewUser(email, password);  
}
////------------------////

const handleEmailChange = e =>{
  setEmail(e.target.value);
}

const handlePasswordChange = e =>{
  setPassword(e.target.value)
}

const toggle = e =>{
  setIsLogin(e.target.checked);
}

const emailVerification = () =>{
  sendEmailVerification(auth.currentUser)
  .then((result) => {
    console.log(result, 'message sent');
  });
}
  return (
    <div className='my-5 mx-5'>
      <h1 className='my-5 mx-5 text-primary'>{isLogin? "Please Sign in" :"Please register"}</h1>
      <form onSubmit={handleRegistration}>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3"/>
    </div>
  </div>
  
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onClick={toggle} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label  className="form-check-label" htmlFor="gridCheck1">
          Already regitered
        </label>
      </div>
    </div>
  </div>
  <div className='my-5 mx-5 text-danger'>{error}</div>
  <button type="submit" className="btn btn-primary">{isLogin? 'Sign In':'Register'}</button>
</form>
    </div>
  );
}

export default App;
