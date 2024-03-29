import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"
import { AiOutlineEye } from "react-icons/ai"
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { togglewishlists } from "../features/ourstore/storeSlice";
import { useDispatch } from "react-redux";



const ProductCard = (productstate, props) => {
  const { grid } = props;
  let location = useLocation();
  const dispatch = useDispatch()

  const [inWishlist, setInWishlist] = useState(false)

  const handleAddWishlist = (productId) => {
    dispatch(togglewishlists({ productId }))
    setInWishlist(!inWishlist)
  }
  return (
    <>
      <div
        className={` ${location.pathname === "/product" ? `gr-${grid}` : "col-3"
          } `}
      >
        <Link
          // to={`${location.pathname === "/"
          //   ? "/product/:id"
          //   : location.pathname === "/product/:id"
          //     ? "/product/:id"
          //     : ":id"
          //   }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button onClick={() => handleAddWishlist(productstate.product._id)} className="border-0 bg-transparent">
              {inWishlist ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
          <div className="product-image">
            <img src={productstate.product.photos[0].secure_url} className="" alt="product image" />
          </div>
          <div className="product-details">
            <h5 className="product-title">
              {productstate.product.name}
            </h5>
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              {productstate.product.description}
            </p>
            <p className="price">${productstate.product.price}</p>
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
        </Link>
      </div>
    </>
  );
};

export default ProductCard;