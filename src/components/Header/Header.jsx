import React, { useState } from 'react';
import classes from './Header.module.css';
import LowerHeader from './LowerHeader';
import { 
  FaMapMarkerAlt, 
  FaSearch, 
  FaShoppingCart,
  FaCaretDown,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={classes.header}>
      {/* Main Header Section */}
      <section className={classes.header__main}>
        <section className={classes.header__container}>
          
          {/* First Div: Logo, Delivery, Icon */}
          <div className={classes.header__first}>
            {/* Logo */}
            <div className={classes.header__logo}>
              <img 
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
                alt="Amazon Logo" 
                className={classes.header__logo__image}
              />
            </div>

            {/* Delivery */}
            <div className={classes.header__delivery}>
              <FaMapMarkerAlt className={classes.header__delivery__icon} />
              <div className={classes.header__delivery__info}>
                <span className={classes.header__delivery__label}>Deliver to</span>
                <span className={classes.header__delivery__location}>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Second Div: All Dropdown, Search */}
          <div className={classes.header__second}>
            {/* All Dropdown */}
            <div className={classes.header__dropdown}>
              <span className={classes.header__dropdown__text}>All</span>
              <FaCaretDown className={classes.header__dropdown__icon} />
            </div>

            {/* Search Bar */}
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

          {/* Third Div: Flag, Sign In, Orders, Cart */}
          <div className={classes.header__third}>
            {/* Flag & Language */}
            <div className={classes.header__language}>
              <img 
                src="https://flagcdn.com/w40/et.png" 
                alt="Ethiopia Flag" 
                className={classes.header__language__flag}
              />
              <span className={classes.header__language__code}>ET</span>
              <FaCaretDown className={classes.header__language__icon} />
            </div>

            {/* Sign In */}
            <div className={classes.header__account}>
              <div className={classes.header__account__greeting}>Hello, sign in</div>
              <div className={classes.header__account__action}>
                Account & Lists <FaCaretDown className={classes.header__account__icon} />
              </div>
            </div>

            {/* Returns & Orders */}
            <div className={classes.header__orders}>
              <div className={classes.header__orders__returns}>Returns</div>
              <div className={classes.header__orders__text}>& Orders</div>
            </div>

            {/* Cart */}
            <div className={classes.header__cart}>
              <div className={classes.header__cart__info}>
                <span className={classes.header__cart__count}>0</span>
                <FaShoppingCart className={classes.header__cart__icon} />
              </div>
              <div className={classes.header__cart__text}>Cart</div>
            </div>

            {/* Mobile Menu Button */}
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
    </header>
  );
};

export default Header;