const SignUpForm = () => {
  return (
    <div>
      <h1>Sign up with your email and password</h1>
      
      <form onSubmit={() => {}}>
        <lable>Display Name</lable>
        <input type="text" required></input>

        <lable>Email</lable>
        <input type="email" required></input>

        <lable>Password</lable>
        <input type="password" required></input>

        <lable>Confirm Password</lable>
        <input type="password" required></input>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;