import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';

const StyledDiv = styled.div`  // added some style to make login page prettier
width:60%;
display:flex;
flex-direction:column;
margin:auto;
align-items:center;
h1{
  padding:5%;
}
`
const StyledForm = styled.form`
display:flex;
align-items:center;
width:50%;
text-align:center;
margin-bottom:25%;
input{
  padding:1% 8%;
  text-align:center;
}
button{
  padding:3%;
  border-radius:15%;
  text-align:center;
}
`



const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const initialState = {              //initial state for the form
    username:'',
    password:''
  }



  const [val, setVal] = useState(initialState);  

  const changeHandler = (e) => {
    setVal({...val, [e.target.name]:e.target.value});    // it changes the input's value
    // console.log(val);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login',val)
    .then(res => {
      // console.log(res) 
      localStorage.setItem('token', res.data.payload); // add token to local storage
      setVal(initialState); // clean the form, it's not necessary, because login page redirects us to the bubblepage. i added it when pages were not connected
      props.history.push('./bubblepage');  //redirecting to bubblepage if axios.post is successful
    })
    .catch(err => {
      console.log(err)
    })
  }
  
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  return (
    <StyledDiv> 
      <h1>
        Welcome to the Bubble App!
      </h1>

      <StyledForm onSubmit={submitHandler}>
        <label>Enter Username</label>
        <input name='username' type='text' value={val.username} onChange={changeHandler}/>
        <label>Enter Password</label>
        <input name='password' type='password' value={val.password} onChange={changeHandler}/>
        <button>Submit</button>
      </StyledForm>
    </StyledDiv>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.