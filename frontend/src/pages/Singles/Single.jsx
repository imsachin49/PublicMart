import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { addProduct } from "../../redux/cartRedux";
import CircularProgress from "@mui/material/CircularProgress";
import "./Single.css";
import Reviews from "../../components/reviews/Reviews";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Footer from "../../components/footer/Footer";
import Recommended from "../../components/recommended/Recommended";
import { RWebShare } from "react-web-share";
import { FaShare } from "react-icons/fa";
import axios from "axios";
import { review } from "../../components/reviews/dummyReview";

export default function Single() {
  const currentUser = useSelector((state) => state?.user?.currentUser?.user);
  const cart = useSelector((state) => state?.cart);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const shareUrl = `https://full-stack-ecommerce-scm2.vercel.app/product/${id}`;
  const isInCart = cart.products.filter((item) => item._id === id).length > 0;
  const [product, setProdut] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get(`/products/find/${id}`);
        setProdut(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleClick = async () => {
    if (!currentUser) {
      alert("Please login to add to cart");
      return;
    }
    console.log({ ...product, size, quantity: 1, color });
    dispatch(addProduct({ ...product, size, quantity: 1, color })); //color also...
    navigate("/cart");
  };

  useEffect(() => {
    const getAllReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://full-stack-ecommerce-mu.vercel.app/api/reviews/product/${product._id}`
        );
        setReviews([...res.data, ...review]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getAllReviews();
  }, [product._id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div className="ppcontainer">
        <div className="single-product">
          <div className="row">
            <div className="col-6">
              <div className="product-image">
                <div className="product-image-main">
                  <img src={product?.img} alt="" id="product-main-image" />
                </div>
              </div>
            </div>

            <div className="col-6 downn">
              <div className="breadcrumb">
                <span>
                  <Link to="#">Home</Link>
                </span>
                <span>
                  <Link to="#">Product</Link>
                </span>
                <span className="active">{product?.title?.slice(0, 25)}</span>
              </div>
              <div className="product">
                <div className="product-title">
                  <h4>
                    <strong>{product?.title?.slice(0, 25)}</strong>
                  </h4>
                </div>
                <div className="product-rating">
                  <span>
                    <i className="bx bxs-star"></i>
                  </span>
                  <span>
                    <i className="bx bxs-star"></i>
                  </span>
                  <span>
                    <i className="bx bxs-star"></i>
                  </span>
                  <span>
                    <i className="bx bxs-star"></i>
                  </span>
                  {reviews?.length % 2 === 0 && (
                    <span>
                      <i className="bx bxs-star"></i>
                    </span>
                  )}
                  <span className="review">
                    <strong>({reviews?.length} Review)</strong>
                  </span>
                </div>
                <div className="product-price">
                  <span className="offer-price">${product?.price}.00</span>
                  <span className="sale-price">${product?.price + 100}.00</span>
                </div>

                <div className="product-details">
                  <h4>
                    <strong>Description</strong>
                  </h4>
                  <p>{product?.desc}</p>
                </div>

                {product?.size && (
                  <div className="product-size">
                    <h4>
                      <strong>Size</strong>
                    </h4>
                    <div className="size-layout">
                      {product?.size &&
                        product?.size?.map((syz) => {
                          return (
                            <>
                              <input
                                type="radio"
                                onChange={(e) => setSize(e.target.value)}
                                name="size"
                                value={syz}
                                id={syz}
                                className="size-input"
                              />
                              <label htmlFor={syz} className="size">
                                {syz}
                              </label>
                            </>
                          );
                        })}
                    </div>
                  </div>
                )}
                {product?.color && (
                  <div className="product-color">
                    <h4>
                      <strong>Color</strong>
                    </h4>
                    <div className="color-layout">
                      {product?.color?.map((clr) => (
                        <div key={clr} style={{ display: "inline-block" }}>
                          <input
                            type="radio"
                            onChange={(e) => setColor(e.target.value)}
                            name="color"
                            value={clr}
                            id={clr}
                            className="color-input"
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor={clr}
                            style={{ backgroundColor: clr }}
                            className={`color-label ${
                              clr === color ? "selected-label" : ""
                            }`}
                          ></label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <span className="divider"></span>

                <div className="product-btn-group">
                  <button onClick={handleClick} className="button buy-now">
                    <i className="bx bxs-cart" />
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </button>
                  <div className="button add-cart">
                    <RWebShare
                      data={{
                        text: "PublicMArt",
                        url: shareUrl,
                        title: `${product.title}`,
                      }}
                    >
                      <div>
                        <span>Share</span>
                        <FaShare style={{ marginLeft: "4px" }} />
                      </div>
                    </RWebShare>
                  </div>
                  {/* <div className="button heart">
                  <i className="bx bxs-heart"></i> Add to Wishlist
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Reviews item={product} />
      <Recommended item={product} />
      <NewsLetter />
      <Footer />
    </>
  );
}
