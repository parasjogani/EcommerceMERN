import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from 'react-toastify';
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createCoupons, resetState } from "../features/coupon/couponSlice";

let schema = yup.object().shape({
    code: yup.string().required("Name is Required"),
    discount: yup.number().required("Discount is Required")
});

const Addcoupon = () => {
    const dispatch = useDispatch();
    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;
    
    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdCoupon]);

    const formik = useFormik({
        initialValues: {
            name: "",
            discount: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createCoupons(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Coupon</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <CustomInput
                        type="text"
                        label="Enter Coupon Name"
                        name="code"
                        onChng={formik.handleChange("code")}
                        onBlr={formik.handleBlur("code")}
                        val={formik.values.code}
                    />
                    <div className="error">
                        {formik.touched.code && formik.errors.code}
                    </div>

                    <CustomInput
                        type="number"
                        label="Enter Discount"
                        name="discount"
                        onChng={formik.handleChange("discount")}
                        onBlr={formik.handleBlur("discount")}
                        val={formik.values.discount}
                    />
                    <div className="error">
                        {formik.touched.discount && formik.errors.discount}
                    </div>

                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Add Coupon
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addcoupon;
