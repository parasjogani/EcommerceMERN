import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { getCategory } from "../features/category/categorySlice"
import Dropzone from "react-dropzone"
import { createProducts, resetState } from "../features/product/productSlice"
import { MdAddAPhoto } from "react-icons/md"

let schema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    price: yup.number().required("Price is Required"),
    description: yup.string().required("Description is Required"),
    collectionId: yup.string().required("Category is Required"),
    stock: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
    const dispatch = useDispatch();

    const [photos, setPhotos] = useState({
        photos: []
    });

    const handlePhotoChange = (acceptedFiles) => {
        setPhotos({
            photos: acceptedFiles
        });
    };

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    useEffect(() => {
        formik.values.photos = photos.photos
    })

    // To get all category
    const categoryState = useSelector((state) => state.category.category)

    //To get created product
    const newProduct = useSelector((state) => state.product)
    const { isSuccess, isError, isLoading, createdProducts } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProducts) {
            toast.success("Product Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading, createdProducts]);

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: '',
            collectionId: '',
            stock: '',
            photos: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const productData = new FormData();
            productData.append('name', values.name);
            productData.append('price', values.price);
            productData.append('description', values.description);
            productData.append('collectionId', values.collectionId);
            productData.append('stock', values.stock);
            for (let i = 0; i < values.photos.length; i++) {
                productData.append('photos', values.photos[i]);
            }

            dispatch(createProducts(productData));

            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <CustomInput
                        type="text"
                        label="Enter Product Name"
                        name="name"
                        onChng={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name}
                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <CustomInput
                        type="text"
                        label="Enter Product Description"
                        name="description"
                        onChng={formik.handleChange("description")}
                        onBlr={formik.handleBlur("description")}
                        val={formik.values.description}
                    />
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        onChng={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
                    </div>

                    <select
                        name="collectionId"
                        onChange={formik.handleChange("collectionId")}
                        onBlur={formik.handleBlur("collectionId")}
                        value={formik.values.collectionId}
                        className="form-control py-3 mb-3"
                        id=""
                    >
                        <option value="">Select Category</option>
                        {categoryState.map((i, j) => {
                            return (
                                <option key={j} value={i._id}>
                                    {i.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.collectionId && formik.errors.collectionId}
                    </div>

                    <CustomInput
                        type="number"
                        label="Enter Product Quantity"
                        name="stock"
                        onChng={formik.handleChange("stock")}
                        onBlr={formik.handleBlur("stock")}
                        val={formik.values.stock}
                    />
                    <div className="error">
                        {formik.touched.stock && formik.errors.stock}
                    </div>

                    <div className="bg-white border-1 p-5 text-center">
                        <Dropzone
                            onDrop={(acceptedFiles) => {
                                handlePhotoChange(acceptedFiles)
                            }
                            }
                            name="photos"
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <span className="fs-3"><MdAddAPhoto /></span>
                                        <p>
                                            Drag 'n' drop some images here, or click to select images
                                        </p>
                                        <p>(images size shoould not be more than 500kb)</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <div className="error">
                            {formik.touched.photos && formik.errors.photos}
                        </div>
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addproduct;