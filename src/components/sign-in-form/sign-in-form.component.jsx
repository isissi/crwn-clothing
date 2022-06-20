import { useState } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase.utils";

import './sign-in-form.styles.scss'

const defaultSignInFields = {
  email: '', 
  password:''
}

const SignInForm = () => {
  const [signInFields, setSignInFields] = useState(defaultSignInFields);
  const {email, password} = defaultSignInFields;

  const SignInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = createUserDocumentFromAuth(user);
  }

  const handleChange = (event) => {
    const {name, value} = event.target; 
    setSignInFields({...signInFields, [name]: value})

  }

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form>
        <FormInput 
          label='Email' 
          inputOptions={{
            type: "email",
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
          <Button buttonType='google' onClick={SignInWithGoogle}>Google Sign In</Button>

        </div>

      </form>

    </div>
  )
}

export default SignInForm;