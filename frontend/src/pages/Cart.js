import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts, resetState } from "../features/cart/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cartstate = useSelector((state) => state.cart.cart.cart);

    useEffect(() => {
        dispatch(resetState())
        dispatch(getCartProducts())
    }, [dispatch]);

    console.log(cartstate);

    return (
        <>
            <Meta title={"Cart"} />
            <BreadCrumb title="Cart" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                        </div>
                        {cartstate && cartstate.products && cartstate.products.map((product) => (
                            <div
                                className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                                key={product._id}
                            >
                                <div className="cart-col-1 gap-15 d-flex align-items-center">
                                    <div className="w-25">
                                        <img
                                            src={product.product.photos[0].secure_url}
                                            className="img-fluid"
                                            alt={product.product.name}
                                        />
                                    </div>
                                    <div className="w-75">
                                        <p>{product.product.name}</p>
                                    </div>
                                </div>
                                <div className="cart-col-2">
                                    <h5 className="price">
                                        ${product.product.price.toFixed(2)}
                                    </h5>
                                </div>
                                <div className="cart-col-3 d-flex align-items-center gap-15">
                                    <div>
                                        <input
                                            className="form-control"
                                            type="number"
                                            name=""
                                            min={1}
                                            max={10}
                                            id=""
                                            defaultValue={product.count}
                                        />
                                    </div>
                                </div>
                                <div className="cart-col-4">
                                    <h5 className="price">
                                        {/* ${product.total.toFixed(2)} */}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/product" className="button">
                                Continue To Shopping
                            </Link>
                            <div className="d-flex flex-column align-items-end">
                                <h4>SubTotal: ${cartstate && cartstate.cartTotal.toFixed(2)}</h4>
                                <p>Taxes and shipping calculated at checkout</p>
                                <Link to="/checkout" className="button">
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Cart;
