import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Authentication/authenticationSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { LightTooltip } from "./LightTooltip";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch", // Adjust this value as needed
    },
  },
}));

export default function PrimarySearchAppBar() {
  const mainColor = "var(--mainColor)";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const state = useSelector((state) => state.auth.user);
  const username = `${state.userName[0].toUpperCase()}${state.userName
    .toString()
    .slice(1)}`;
  const cartState = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleShowProfile = () => {};
  const handleGoToCart = () => {
    navigate("/cart");
  };
  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleShowProfile}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={cartState.length} color="error">
            <AccountCircle />
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "black" }}
        sx={{ padding: "5px" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <LightTooltip title="Menu">
              <MenuIcon />
            </LightTooltip>
          </IconButton>
          <LightTooltip title="Title">
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              color={mainColor}
              fontWeight={"bold"}
            >
              MegaMart
            </Typography>
          </LightTooltip>
          <Box sx={{ flexGrow: 1 }} />
          <LightTooltip title="Search">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search essentials, groceries and more..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </LightTooltip>
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            <LightTooltip title="Profile">
              <Typography
                variant="body1"
                fontSize={15}
                sx={{ marginRight: 1, marginLeft: 1, cursor: "pointer" }}
                color={mainColor}
                onClick={handleGoToProfile}
              >
                Hello, {username}
              </Typography>
            </LightTooltip>
            <LightTooltip title="Cart">
              <IconButton size="large" color="inherit" onClick={handleGoToCart}>
                <Badge badgeContent={cartState.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </LightTooltip>
          </Box>

          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <LightTooltip title="Logout">
              <IconButton
                size="large"
                aria-label="log out"
                aria-haspopup="true"
                onClick={handleLogout}
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
            </LightTooltip>
          </Box>
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
