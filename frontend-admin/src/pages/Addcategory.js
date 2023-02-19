import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from 'react-toastify';
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createCategories, getACategory, resetState, updateCategories } from "../features/category/categorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
});

const Addcategory = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate()
    const getCategoryId = location.pathname.split("/")[3]

    const newCategory = useSelector((state) => state.category);
    const { isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory } = newCategory;

    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success("Collection Added Successfullly!");
        }
        if (isSuccess && updatedCategory) {
            toast.success("Collection Update Successfullly!");
            navigate("/admin/category-list")
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory, navigate]);

    useEffect(() => {
        if (getCategoryId !== undefined) {
            dispatch(getACategory(getCategoryId))
        } else {
            dispatch(resetState())
        }
    }, [getCategoryId, dispatch])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: categoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getCategoryId !== undefined) {
                const data = { id: getCategoryId, categoryData: values }
                dispatch(updateCategories(data))
                dispatch(resetState());

            } else {
                dispatch(createCategories(values));
                formik.resetForm();
            }
            dispatch(resetState());
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">
                {getCategoryId !== undefined ? "Update" : "Add"} Category</h3>
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
                        {getCategoryId !== undefined ? "Update" : "Add"} Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addcategory;
