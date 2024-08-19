import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCore, { Navigation } from "swiper";
import "./Recommended.css";
import ReviewModal from "../modals/review/ReviewModal";
import SingleRecommend from "./SingleRecommend";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";

SwiperCore.use([Navigation]);

const Recommended = ({ item }) => {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const swiperRef = useRef(null);
  const [recommends, setRecommends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hideNextButton, setHideNextButton] = useState();
  const [hidePrevButton, setHidePrevButton] = useState(true);
  const [openAddReviewModal, setOpenReviewModal] = useState(false);
  const cat = item?.categories;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const categoryUrls = cat?.map(
          (category) =>
            `https://full-stack-ecommerce-mu.vercel.app/api/products?category=${category}`
        );
        const requests = categoryUrls?.map(async (url) => await axios.get(url));
        const responses = await Promise.all(requests);

        // Flatten the arrays, remove duplicates, and exclude the current item
        const products = responses
          ?.flatMap((response) => response?.data)
          ?.filter(
            (product, index, self) =>
              index === self.findIndex((p) => p._id === product._id) &&
              product._id !== item._id // Exclude current item
          );

        setRecommends(products);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (cat && cat.length > 0) {
      getProducts();
    }
  }, [item, cat]);

  const handleResize = () => {
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    if (screenWidth >= 1024) {
      setSlidesPerView(4);
    } else if (screenWidth >= 730) {
      setSlidesPerView(3);
    } else if (screenWidth >= 470) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.on("slideChange", () => {
        if (swiper.isBeginning) {
          setHidePrevButton(true);
        } else {
          setHidePrevButton(false);
        }
      });
      swiper.on("slideChange", () => {
        if (swiper.isEnd) {
          setHideNextButton(true);
        } else {
          setHideNextButton(false);
        }
      });
    }
  }, [swiperRef]);

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="recommended">
      <div className="recHeader">
        <h1 className="recText">Similar Products({recommends?.length})</h1>
      </div>
      <div className="AllRecOuter">
        {!hidePrevButton &&  (
          <button onClick={handlePrev} className="PrevBtn">
            <TbSquareRoundedArrowLeftFilled size={35} color="#111" />
          </button>
        )}
        {!loading ? (
          <Swiper
            className="Allrecs"
            spaceBetween={2}
            slidesPerView={slidesPerView}
            navigation={{ prevEl: ".prevButton", nextEl: ".nextButton" }}
            ref={swiperRef}
          >
            {recommends?.map((m, index) => (
              <SwiperSlide key={m._id}>
                <SingleRecommend item={m} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            className="Allrecs"
            spaceBetween={2}
            slidesPerView={slidesPerView}
            navigation={{ prevEl: ".prevButton", nextEl: ".nextButton" }}
            ref={swiperRef}
          >
            {[1, 2, 3, 4]?.map((m, index) => (
              <SwiperSlide key={index} style={{ margin: "10px" }}>
                <Skeleton height={200} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {!hideNextButton && (
          <button onClick={handleNext} className="NextBtn">
            <TbSquareRoundedArrowRightFilled size={35} color="#111" />
          </button>
        )}
      </div>
      {openAddReviewModal && (
        <ReviewModal
          item={item}
          open={openAddReviewModal}
          onClose={() => setOpenReviewModal(false)}
        />
      )}
    </div>
  );
};

export default Recommended;
