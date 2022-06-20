import { useState } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultSignInFields = {
  email: '', 
  password:''
}

const SignInForm = () => {
  const [defaultSignInFields, setDefaultSignInFields] = useState(defaultSignInFields);
  const {email, password} = defaultSignInFields;

  const handleChange = (event) => {
    const {name, value} = event.target; 
    setDefaultSignInFields({...defaultSignInFields, [name]: value})

  }

  return (
    <div>
      <h2>I already have an account</h2>

    </div>
  )
}

export default SignInForm;