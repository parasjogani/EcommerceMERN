import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <form action="">
          <h3 className="text-center">Login</h3>
          <p className="text-center">Login to your account to continue</p>
          <CustomInput type="text" label="Email address" id="email" />
          <CustomInput type="password" label="Password" id="password" />
          <div className="text-end mt-2">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <Link
            to="/admin"
            className="border-0 px-3 py-2 text-white fw-bold w-100 mt-2 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login