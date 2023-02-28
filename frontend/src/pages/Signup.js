import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from 'react-router-dom'
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from "../features/auth/authSlice"
const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Enter valid email").required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },

        validationSchema: schema,

        onSubmit: (values) => {
            dispatch(signup(values))
        },
    });

    const authstate = useSelector((state) => state)
    const { user, isLoading, isError, isSuccess } = authstate.auth

    useEffect(() => {
        if (isSuccess && user) {
            navigate("/product")
        } else {
            navigate("")
        }
    }, [user, isLoading, isError, isSuccess, navigate])
    return (
        <>
            <Meta title={"Sign Up"} />
            <BreadCrumb title="Sign Up" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">Sign Up</h3>
                            <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15 w-2">
                                <CustomInput
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={formik.handleChange("name")}
                                    value={formik.values.name} />
                                <div className="error">
                                    {formik.touched.name && formik.errors.name ? (
                                        <div>{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange("email")}
                                    value={formik.values.email} />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email ? (
                                        <div>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <CustomInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={formik.handleChange("password")}
                                    value={formik.values.password}
                                />
                                <div className="error">
                                    {formik.touched.password && formik.errors.password ? (
                                        <div>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0" type="submit" >Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Signup;