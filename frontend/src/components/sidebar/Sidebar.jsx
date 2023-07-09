import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import CategoryList from "../categories/CategoryList";
import { FiCornerRightDown } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import bgTop from "../../assets/drawer-top.webp";
import { Button } from "@mui/material";
import { TbLogout } from "react-icons/tb";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Link as Go } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavHashLink } from "react-router-hash-link";
import { setLogout } from "../../redux/userRedux";
import LoginIcon from "@mui/icons-material/Login";

export const MuiDrawer = ({ openDrawer, setOpenDrawer }) => {
  const navigate = useNavigate();
  var isUser = false;
  const currentUser = useSelector((state) => state?.user?.currentUser?.user);
  // console.log(currentUser);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.pathname);
  const handleClick = () => {
    setOpenDrawer(false);
  };

  if (currentUser) {
    isUser = true;
  } else {
    isUser = false;
  }

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {isUser ? (
          <Box
            p={2}
            width="240px"
            minHeight="80px"
            role="presentation"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "white",
              color: "#111",
              fontSize: "20px",
              fontWeight: "bold",
              borderBottom: "1px solid rgb(244,51,151)",
              gap: "1px",
              fontFamily: "'candara',sans-serif'",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "'candara',sans-serif",
                fontSize: "20px",
              }}
            >
              <b>{currentUser?.username}</b>
            </Typography>
            <Button
              sx={{
                backgroundColor: "red",
                fontWeight: "bold",
                color: "white",
                width: "100px",
                padding: "2px",
                marginTop: "5px",
                marginLeft: "6px",
              }}
              onClick={handleLogout}
            >
              Logout
              <LogoutIcon style={{ marginLeft: "4px" }} />
            </Button>
          </Box>
        ) : (
          <img src={bgTop} alt="no" height={80} />
        )}
        <Box p={1} width="240px" role="presentation" textAlign="start">
          {!isUser && <Link
            to="/login"
            style={{ textDecoration: "none", color: "black" }}
            onClick={handleClick}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "0px 8px",
                borderRadius: "4px",
                padding: "1px 10px",
                marginRight: "10px",
                color: "black",
                backgroundColor: "#222",
                color: "white",
              }}
            >
              <LoginIcon size={22} color="black" />
              <Typography
                variant="h5"
                p={1}
                sx={{
                  margin: "2px 8px",
                  padding: "6px 8px",
                  fontFamily: "'candara',sans-serif",
                  fontWeight: "bold",
                  fontSize: "24px",
                  borderRadius: "5px",
                  marginLeft: "0px",
                  color: "white",
                }}
              >
                Login
              </Typography>
            </Box>
          </Link>}
          <Link to="/" style={{ textDecoration: "none" }} onClick={handleClick}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "0px 8px",
                borderRadius: "4px",
                padding: "1px 10px",
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "rgb(244, 51, 151)",
                  color: "white",
                },
              }}
            >
              <IoMdHome size={22} color="black" />
              <Typography
                variant="h5"
                p={1}
                sx={{
                  margin: "2px 8px",
                  padding: "6px 8px",
                  fontFamily: "'candara',sans-serif",
                  fontWeight: "bold",
                  fontSize: "24px",
                  color: "#222",
                  borderRadius: "5px",
                  marginLeft: "0px",
                  "&:hover": {
                    backgroundColor: "rgb(244, 51, 151)",
                    color: "white",
                  },
                }}
              >
                Home
              </Typography>
            </Box>
          </Link>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "0px 8px",
              borderRadius: "4px",
              padding: "1px 10px",
              marginRight: "10px",
              "&:hover": {
                backgroundColor: "rgb(244, 51, 151)",
                color: "white",
              },
            }}
          >
            <TbCategory2 size={22} />
            <Typography
              variant="h5"
              p={1}
              sx={{
                margin: "2px 8px",
                padding: "6px 8px",
                fontFamily: "'candara',sans-serif",
                fontWeight: "bold",
                fontSize: "24px",
                color: "#222",
                borderRadius: "5px",
                marginLeft: "0px",
                "&:hover": {
                  backgroundColor: "rgb(244, 51, 151)",
                  color: "white",
                },
              }}
            >
              Categories
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {CategoryList.map((c, index) => {
              return (
                <Link
                  to={`/products/${c.cat}`}
                  style={{ textDecoration: "none" }}
                  onClick={handleClick}
                >
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      width: "100%",
                      maxWidth: "175px",
                      border: "1px solid #f1f1f1",
                      alignItems: "center",
                      margin: "3px 8px",
                      marginLeft: "30px",
                      borderRadius: "2px",
                      "&:hover": {
                        backgroundColor: "rgb(244, 51, 151)",
                        color: "white",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        padding: "0px 2px",
                        fontFamily: "'candara',sans-serif",
                        fontWeight: "550px",
                        color: "#333",
                        margin: "5px 4px",
                        marginRight: "2px",
                        textTransform: "capitalize",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                    >
                      {c.cat}
                    </Typography>
                    <BsArrowUpRight size={12} />
                  </Box>
                </Link>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "7px",
              marginRight: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "1px 8px",
                borderRadius: "4px",
                padding: "1px 10px",
                "&:hover": {
                  backgroundColor: "rgb(244, 51, 151)",
                  color: "white",
                },
              }}
            >
              <AiFillHeart size={22} />
              <Typography
                variant="h5"
                p={1}
                sx={{
                  margin: "2px 8px",
                  padding: "6px 8px",
                  fontFamily: "'candara',sans-serif",
                  fontWeight: "bold",
                  color: "#222",
                  borderRadius: "5px",
                  marginLeft: "0px",
                  "&:hover": {
                    backgroundColor: "rgb(244, 51, 151)",
                    color: "white",
                  },
                }}
              >
                Wishlist
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "0px 8px",
                borderRadius: "4px",
                padding: "1px 10px",
                "&:hover": {
                  backgroundColor: "rgb(244, 51, 151)",
                  color: "white",
                },
              }}
            >
              <RiShoppingCartFill size={22} />
              <Typography
                variant="h5"
                p={1}
                sx={{
                  margin: "2px 8px",
                  padding: "6px 8px",
                  fontFamily: "'candara',sans-serif",
                  fontWeight: "bold",
                  color: "#222",
                  borderRadius: "5px",
                  marginLeft: "0px",
                  "&:hover": {
                    backgroundColor: "rgb(244, 51, 151)",
                    color: "white",
                  },
                }}
              >
                Orders
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
