import { useState } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils";

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '', 
  password:''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;

  const SignInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await signInAuthUserWithEmailAndPassword(email, password); 
      console.log(res);
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password' : 
          alert('Incorrect password!');
          break
        case 'auth/user-not-found' : 
        alert('No user associated with this email');
        break;
        default: 
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Email' 
          inputOptions={{
            type: "s",
            required: true,
            onChange: handleChange, 
            name: 'email', 
            value: email
          }}
        />

        <FormInput 
          label='Password'
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange, 
            name: 'password',
            value: password 
          }} 
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button' buttonType='google' onClick={SignInWithGoogle}>Google Sign In</Button>

        </div>

      </form>

    </div>
  )
}

export default SignInForm;