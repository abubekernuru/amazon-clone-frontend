import React, { useState, useContext, useEffect } from "react";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router"; // 
import { DataContext } from "../DataProvider/DataProvider";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaCaretDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { auth } from "../../Utility/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false); 
  const [{ basket }] = useContext(DataContext);
  const [user, setUser] = useState(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleAccountDropdown = () =>
    setIsAccountDropdownOpen(!isAccountDropdownOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // alert("Signed out successfully!");
      setIsAccountDropdownOpen(false);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const totalItems = basket.reduce(
    (count, item) => count + (item.qty || 1),
    0
  );

 const userName = user?.displayName
  ? user.displayName.split(" ")[0] // get first word (before the space)
  : user?.email
  ? user.email.split("@")[0]       // fallback: first part of email
  : "Guest";



  return (
    <header className={classes.header}>
      {/* ===== Main Header ===== */}
      <section className={classes.header__main}>
        <section className={classes.header__container}>
          {/* ===== Left Section ===== */}
          <div className={classes.header__first}>
            <Link to="/" className={classes.header__logo}>
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
                className={classes.header__logo__image}
              />
            </Link>

            <div className={classes.header__delivery}>
              <FaMapMarkerAlt className={classes.header__delivery__icon} />
              <div className={classes.header__delivery__info}>
                <span className={classes.header__delivery__label}>
                  Deliver to
                </span>
                <span className={classes.header__delivery__location}>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* ===== Middle Section ===== */}
          <div className={classes.header__second}>
            <div className={classes.header__dropdown}>
              <span className={classes.header__dropdown__text}>All</span>
              <FaCaretDown className={classes.header__dropdown__icon} />
            </div>
            <div className={classes.header__search}>
              <input
                type="text"
                className={classes.header__search__input}
                placeholder="Search Amazon"
              />
              <button className={classes.header__search__button}>
                <FaSearch className={classes.header__search__icon} />
              </button>
            </div>
          </div>

          {/* ===== Right Section ===== */}
          <div className={classes.header__third}>
            <div className={classes.header__language}>
              <img
                src="https://flagcdn.com/w40/et.png"
                alt="Ethiopia Flag"
                className={classes.header__language__flag}
              />
              <span className={classes.header__language__code}>ET</span>
              <FaCaretDown className={classes.header__language__icon} />
            </div>

            {/* Account Section */}
            {user ? (
              <div
                className={classes.header__account}
                onMouseEnter={toggleAccountDropdown}
                onMouseLeave={toggleAccountDropdown}
              >
                <div className={classes.header__account__greeting}>
                  Hello, {userName}
                </div>
                <div className={classes.header__account__action}>
                  Account & Lists <FaCaretDown className={classes.header__account__icon} />
                </div>

                {/* Dropdown */}
                {isAccountDropdownOpen && (
                  <div className={classes.accountDropdown}>
                    <span onClick={handleSignOut}>Sign Out</span>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className={classes.header__account}>
                <div className={classes.header__account__greeting}>Hello, sign in</div>
                <div className={classes.header__account__action}>
                  Account & Lists <FaCaretDown className={classes.header__account__icon} />
                </div>
              </Link>
            )}

            <Link to="/orders" className={classes.header__orders}>
              <div className={classes.header__orders__returns}>Returns</div>
              <div className={classes.header__orders__text}>& Orders</div>
            </Link>

            <Link to="/cart" className={classes.header__cart}>
              <div className={classes.header__cart__info}>
                <span className={classes.header__cart__count}>{totalItems}</span>
                <FaShoppingCart className={classes.header__cart__icon} />
              </div>
            </Link>

            <button
              className={classes.header__mobile__button}
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </section>
      </section>

      {/* Lower Header */}
      <LowerHeader isMobileOpen={isMobileMenuOpen} />

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={classes.mobileMenu}>
          {user ? (
            <span onClick={handleSignOut} className={classes.mobileMenuItem}>
              Sign Out
            </span>
          ) : (
            <Link to="/auth" className={classes.mobileMenuItem}>
              Sign In
            </Link>
          )}
          <Link to="/orders" className={classes.mobileMenuItem}>
            Returns & Orders
          </Link>
          <Link to="/cart" className={classes.mobileMenuItem}>
            Cart ({totalItems})
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
