import { useState } from "react";
import Input from "../../layout/Form/Input";

const Login = () => {

  const loginFormValue = {
    email: "",
    password: "",
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}/
  const inputs = [
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "example@domain.com",
      value: "",
      // errorMessage: "Valid email must be specified",
      // pattern: emailRegex,
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "password",
      value: "",
      errorMessage: "Valid password must be specified",
      required: true,
    },
  ]

  const [loginForm, setLoginForm] = useState(loginFormValue)

  const onChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const onLoginSubmit = (e) => {
    e.preventDefault()
    console.log(loginForm);
    console.log(loginFormValue);

    // set name attribute on input field to fetch data
    // const formData = new FormData(e.target)
    // console.log(Object.fromEntries(formData.entries()));
  }

  const validateLoginForm = (formValues) => {
    if (!formValues.email) {
      inputs[0].errorMessage = "Email must be specified"
    } else if (emailRegex.test(formValues.email)) {
      inputs[0].errorMessage = "Email must be of type example@domain.com"
    }
    
  }

  return (
    <>
      <div className="container my-10">
        <div className="d-flex justify-content-center">
          <div className="card card-width rounded shadow">
            <div className="card-body">
              <div className="card-title text-justify">
                <h3><strong>Login</strong></h3>
                <p className="card-subtitle">Hey, Enter your details to get sign in to your account</p>
              </div>
              <div className="pt-3 pb-5">
                <div className="d-flex flex-column">

                  <pre>{JSON.stringify(loginForm, undefined, 2)}</pre>

                  <form onSubmit={onLoginSubmit}>

                    {inputs.map((input) => (
                      <Input key={input.id} {...input}
                        value={loginForm[input.name]} onChange={onChange} />
                    ))}

                    <div className="mb-3">
                      <button type="submit" className="btn-blue w-100 py-2 rounded">
                        <strong>Login</strong>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Login;