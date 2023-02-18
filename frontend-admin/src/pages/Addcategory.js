import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from 'react-toastify';
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createCategories, resetState } from "../features/category/categorySlice";

let schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
});

const Addcategory = () => {
    const dispatch = useDispatch();
    const newCategory = useSelector((state) => state.category);
    const { isSuccess, isError, isLoading, createdCategory } = newCategory;

    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success("Collection Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdCategory]);

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createCategories(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 3000)
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Category</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <CustomInput
                        type="text"
                        label="Enter Category Name"
                        name="name"
                        onChng={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name}
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>

                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addcategory;
