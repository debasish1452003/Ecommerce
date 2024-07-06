import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
import "../styles/ProductDetailStyle.css";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  // initialise details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Normal numbers added with commas according to indian standards
  function formatIndianNumber(num) {
    return num.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  }

  //   Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ₹ {product.price}</h6>
          {/* <h6>Category: {product.category.name}</h6> */}
          {product.category && product.category.name ? (
            <h6>Category : {product.category.name}</h6>
          ) : (
            <h6>No product name available</h6>
          )}
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h3>Similar Products</h3>
        {relatedProducts.length < 1 && <p>No Similar Products Found</p>}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div
              className="card m-2"
              //  style={{ width: "18rem" }}
              key={p._id}
            >
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {`\u20B9 `}
                    {formatIndianNumber(p.price)}
                  </h5>
                </div>

                <p className="card-text">{p.description.substring(0, 60)}...</p>

                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
