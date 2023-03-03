import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { RxCross2 } from "react-icons/rx"
import { AiOutlineEye } from "react-icons/ai"
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { getallwishlist } from "../features/auth/authSlice";
import { togglewishlists } from "../features/ourstore/storeSlice";


const Wishlist = () => {
    const dispatch = useDispatch()
    const userstate = useSelector((state) => state.auth.wishlist.user)
    useEffect(() => {
        dispatch(getallwishlist())
    }, [dispatch])

    const handleRemoveWishlist = (productId) => {
        dispatch(togglewishlists({ productId }))
        setTimeout(() => {
            dispatch(getallwishlist())
        }, 100)
    }

    return (
        <>
            <Meta title={"Wishlist"} />
            <BreadCrumb title="Wishlist" />
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                {userstate && userstate.wishlist && userstate.wishlist.length > 0 ? (
                    <div className="row">
                        {userstate.wishlist.map((product) => (
                            <div key={product._id} className="col-3">
                                <div>
                                    <div className="product-card position-relative">
                                        <div className="wishlist-icon position-absolute">
                                            <button onClick={() => handleRemoveWishlist(product._id)} className="border-0 bg-transparent">
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
                        ))}
                    </div>
                ) : (
                    <div className="d-flex justify-content-center">
                        <h5>No Items in Your Wishlist</h5>
                    </div>
                )}
            </Container>
        </>
    );
};

export default Wishlist;
