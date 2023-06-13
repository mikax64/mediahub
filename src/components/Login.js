import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {

  
  const [errorLogin, setErrorLogin] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistration = (infos) => loginUser(infos);
  const navigate = useNavigate();

  const registerOptions = {
    username: { required: "Username requis" },
    password: { required: "Password requis" },
  };

  const loginUser = async (infos) => {
    let result = await login(infos);
    if (result.token) {
      localStorage.setItem("token-mediahub", result.token)
      navigate("/movies");
    } else {
      setErrorLogin(result.err)
  
    }

    
  };

  return (
    <div className="app-login wrapper">

      <h1 className="title-h1">Login</h1>
      <form onSubmit={handleSubmit(handleRegistration)} className="form-login">
        <div className="section">
          <label>Username</label>
          <input
            name=""
            type="text"
            className="input-text"
            {...register("username", registerOptions.username)}
          />
          <p className="error"> {errors?.username && errors.username.message}</p>
        </div>

        <div className="section">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="input-text"
            {...register("password", registerOptions.password)}
          />
          <p className="error">{errors?.password && errors.password.message}</p>
        </div>
        <button className="cta-primary"> Login</button>
        <p className="error">{errorLogin}</p>
      </form>


    </div>
  );
};

export default Login;
