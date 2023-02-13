import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let schema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: schema,

    onSubmit: values => {
      dispatch(login(values))
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user._id !== null || isSuccess) {
      navigate("admin")
    }
  }, [user, isLoading, isError, isSuccess, message])
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <form onSubmit={formik.handleSubmit}>
          <h3 className="text-center">Login</h3>
          <p className="text-center">Login to your account to continue</p>
          <CustomInput type="text"
            name="email"
            label="Email address"
            id="email"
            onChng={formik.handleChange("email")}
            val={formik.values.email} />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput type="password"
            name="password"
            label="Password"
            id="password"
            onChng={formik.handleChange("password")}
            val={formik.values.password} />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="text-end mt-2">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 mt-2 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login