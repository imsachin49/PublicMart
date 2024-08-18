import React, { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import starFilled from "../../assets/icons/star-filled.svg";
import starEmpty from "../../assets/icons/star-empty.svg";
import "./Test.css";
import { FaArrowRight } from "react-icons/fa6";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function Product({ item }) {
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const user = useSelector((state) => state?.user?.currentUser?.user);
  const isLoggedIn = user ? true : false;

  useEffect(() => {
    setIsLiked(item?.likes?.includes(user?.id));
  }, [item?._id, user, item?.likes]);

  useEffect(() => {
    // Randomize the number of filled stars between 1 and 5
    setRating(Math.floor(Math.random() * 5) + 1);
  }, [item]);

  const handleLike = async () => {
    if (isLoggedIn) {
      try {
        const res = await axios.put(
          `https://full-stack-ecommerce-mu.vercel.app/api/products/${item?._id}/like`,
          { userId: user?.id }
        );
        console.log(res.data);
        setIsLiked(!isLiked);
      } catch (error) {
        console.log(error);
        alert("Like feature coming soon!!");
      }
    } else {
      alert("Please login to like the product");
    }
  };

  return (
    <div
      className="product-card"
      style={{ height: item?.title?.length > 25 ? "330px" : "310px" }}
    >
      <img className="product-image" src={item?.img} alt="Product" />

      <div className="product-info">
        <div className="product-likes">
          <Link to="#" className="product-title">
            {truncateText(item?.title, 50)}
          </Link>

          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className={`star ${i < rating ? "filled" : "empty"}`}
                  src={i < rating ? starFilled : starEmpty}
                  alt={i < rating ? "Star filled" : "Star empty"}
                />
              ))}
            </div>
            <span className="rating-score">5.0</span>
          </div>
        </div>

        <div className="product-footer">
          <span className="product-price">${item?.price}</span>
          <Link to={`/product/${item?._id}`} className="add-to-cart">
            Explore
            <FaArrowRight style={{ fontSize: "15px", color: "gray" }} />
          </Link>
        </div>
      </div>
      <BsFillHeartFill
        className="like-icon"
        size={18}
        onClick={handleLike}
        color={isLiked ? "red" : "gray"}
      />
    </div>
  );
}
