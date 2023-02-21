import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import useLocalStorage from "../../hooks/useLocalStorage";
import Input from "../../layout/Form/Input/Input";
import { login as loginService } from "../../service/auth"

const Login = () => {

  const loginFormValue = {
    username: "shailesh@admin.com",
    password: "admin",
  }

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}/
  const inputs = [
    {
      id: "username",
      name: "username",
      type: "username",
      label: "Email",
      placeholder: "example@domain.com",
      value: "",
      errorMessage: "Invalid email specified. Email must be of the type example@domain.com",
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
  const navigate = useNavigate()

  // const [roleName, setRoleName] = useLocalStorage("roleName", "")
  // const [username, setUsername] = useLocalStorage("username", "")
  // const [credentialID, setCredentialID] = useLocalStorage("credentialID", "")
  // const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", 0)

  const onChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const onLoginSubmit = (e) => {
    e.preventDefault()
    console.log(loginForm);

    // set name attribute on input field to fetch data
    // const formData = new FormData(e.target)
    // console.log(Object.fromEntries(formData.entries()));

    validateLoginForm(loginForm)
  }

  const validateLoginForm = () => {
    // do validations like valid email should be specified
    login()
  }

  const login = async () => {
    try {
      const response = await loginService(loginForm)
      console.log(response);

      // setCredentialID(response.data.id)
      // setRoleName(response.data.roleName)
      // setUsername(response.data.username)
      // setIsAuthenticated(1)

      localStorage.setItem("credentialID", response.data.id)
      localStorage.setItem("rolename", response.data.roleName.toLowerCase())
      localStorage.setItem("username", response.data.username)
      localStorage.setItem("isAuthenticated", 1)

      // console.log(roleName, username, isAuthenticated);
      navigate("/banks", { replace: false })
    } catch (error) {
      console.error(error);
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