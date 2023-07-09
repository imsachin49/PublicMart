import "./nav2.css";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavHashLink } from "react-router-hash-link";
import { setLogout } from "../../redux/userRedux";
import { IconButton, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { Select, FormControl } from "@mui/material";
import { LuSearch } from "react-icons/lu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BiUserCircle } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { MuiDrawer } from "../sidebar/Sidebar.jsx";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useMediaQuery } from "@mui/material";
import { CgMenuRight } from "react-icons/cg";

const Nav2 = () => {
  var isUser = false;
  const quantity = useSelector((state) => state?.cart?.quantity);
  const currentUser = useSelector((state) => state?.user?.currentUser?.user);
  // console.log(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const location = useLocation();
  console.log(location.pathname);
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  console.log(isAuthPage);
  const [showfullSearchMenu, setShowfullSearchMenu] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const smallerScreen = useMediaQuery("(max-width:768px)");
  const [openDrawer, setOpenDrawer] = useState(false);

  if (currentUser) {
    // console.log(currentUser.username);
    isUser = true;
  } else {
    // console.log("no user");
    isUser = false;
  }

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(title);
    if (title?.trim().length > 0) {
      navigate(`/search?title=${title.trim()}`);
    } else {
      console.log("hello heloo");
      navigate("/");
    }
  };

  const handleUserDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <div className="nav2Container" style={{ zIndex: "100" }}>
      <div className="nav2Wrapper">
        <div className="logo">
          <img
            src="https://img.icons8.com/bubbles/1x/shopping-cart.png"
            alt="no-images"
            className="logoImg"
          />
          <Link className="logoName" to="/">
            PublicMart
          </Link>
        </div>

        {!smallerScreen && (
          <div className="nav2List">
            <Link className="nav2ListLink" to="/">
              Home
            </Link>
            <Link className="nav2ListLink" to="/#categories">
              Categories
            </Link>
            <Link className="nav2ListLink" to="/#new">
              What's New
            </Link>
          </div>
        )}

        <div className="nav2Right">
          {/*<form className="NavSearch" onSubmit={() => {}}>
              <GoSearch
                style={{ margin: "0px 5px", marginLeft: "10px" }}
                color="gray"
              />
              <input
                type="text"
                placeholder="Search for Products"
                className="searchInput"
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
              />
        </form>*/}

          <IconButton color="error">
            <GoSearch color="black" size={22}/>
          </IconButton>

          {!smallerScreen && isUser && (
            <IconButton
              style={{ marginLeft: "7px" }}
              onClick={handleUserDropDown}
            >
              <IoPersonOutline />
            </IconButton>
          )}

          {isUser ? (
            <Link
              className="NavAuthItemsCart"
              to="/cart"
              style={{ marginRight: "7px" }}
            >
              <IconButton>
                <Badge badgeContent={quantity} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          ) : (
            <Link
              className="NavAuthItemsCart"
              to="/login"
              style={{ margin: "0px 3px" }}
            >
              <IconButton color="error">
                <LoginIcon sx={{ color: "black" }} />
              </IconButton>
            </Link>
          )}
          {smallerScreen && (
            <IconButton
              style={{ marginLeft: "3px", fontWeight: "bold" }}
              onClick={() => setOpenDrawer(true)}
            >
              <CgMenuRight color="black" />
            </IconButton>
          )}
        </div>

        {openDropDown && isUser && (
          <div className="userDropDown">
            <Link className="userDropDownLink" to="/">
              <FaUserCircle className="userDropDownIcon" size={22} />
              <Typography
                className="userDropDownText"
                sx={{ fontFamily: "'candara',sans-serif" }}
              >
                {currentUser?.username}
              </Typography>
            </Link>
            <Link className="userDropDownLink" to="/">
              <FavoriteIcon className="userDropDownIcon" />
              <Typography
                className="userDropDownText"
                sx={{ fontFamily: "'candara',sans-serif" }}
              >
                Wishlist
              </Typography>
            </Link>
            <Link className="userDropDownLink" to="/">
              <ShoppingCartIcon className="userDropDownIcon" />
              <Typography
                className="userDropDownText"
                sx={{ fontFamily: "'candara',sans-serif" }}
              >
                Orders
              </Typography>
            </Link>
            <div className="userDropDownLink" to="#" onClick={handleLogout}>
              <LoginIcon className="userDropDownIcon" />
              <Typography
                className="userDropDownText"
                sx={{ fontFamily: "'candara',sans-serif" }}
              >
                Logout
              </Typography>
            </div>
          </div>
        )}
      </div>
      {smallerScreen && (
        <MuiDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      )}
    </div>
  );
};

export default Nav2;
