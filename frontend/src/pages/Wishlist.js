import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { RxCross2 } from "react-icons/rx"
import { AiOutlineEye } from "react-icons/ai"
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { getProducts } from "../features/ourstore/storeSlice";
import { useDispatch, useSelector } from 'react-redux';


const Wishlist = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const productstate = useSelector((state) => state.ourstore.products)
    const authstate = useSelector((state) => state.auth.user.user)

    return (
        <>
            <Meta title={"Wishlist"} />
            <BreadCrumb title="Wishlist" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                    {authstate.wishlist.map((productId) => {
                        const product = productstate.find((p) => p._id === productId)
                        if (!product) return null
                        return (

                            < div key={product._id} className="col-3" >
                                <div>
                                    <div className="product-card position-relative">
                                        <div className="wishlist-icon position-absolute">
                                            <button className="border-0 bg-transparent">
                                                {<RxCross2 className="cross-icon" />}
                                            </button>
                                        </div>
                                        <div className="product-image">
                                            <img src={product.photos[0].secure_url} className="" alt="product" />
                                        </div>
                                        <div className="product-details">
                                            <h5 className="product-title">
                                                {product.name}
                                            </h5>
                                            <p className="description" >
                                                {product.description}
                                            </p>
                                            <p className="price">${product.price}</p>
                                        </div>
                                        <div className="action-bar position-absolute">
                                            <div className="d-flex flex-column gap-15">
                                                <button className="border-0 bg-transparent">
                                                    {<AiOutlineEye className="view-icon mt-3 fs-4" />}
                                                </button>
                                                <button className="border-0 bg-transparent">
                                                    {<MdOutlineAddShoppingCart className="addcart-icon mt-0 fs-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </>
    );
};

export default Wishlist;