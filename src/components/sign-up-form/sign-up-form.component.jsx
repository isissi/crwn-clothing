import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";

const defaultFormFields = {
  displayName: '',
  email: '', 
  password: '', 
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('password do not match');
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName })

    } catch(error) {

      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      } else {
        console.log('User creation encountered an error', error);
      }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }


  return (
    <div>
      <h1>Sign up with your email and password</h1>
      
      <form onSubmit={handleSubmit}>
        <lable>Display Name</lable>
        <input type="text" required onChange={handleChange} name='displayName' value={displayName}></input>

        <lable>Email</lable>
        <input type="email" required onChange={handleChange} name='email' value={email}></input>

        <lable>Password</lable>
        <input type="password" required onChange={handleChange} name='password' value={password}></input>

        <lable>Confirm Password</lable>
        <input type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}></input>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;