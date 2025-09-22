import React from 'react';
import classes from './Header.module.css';
import { FaBars } from 'react-icons/fa';

const LowerHeader = ({ isMobileOpen }) => {
  const menuItems = [
    { id: 1, text: 'All', icon: FaBars },
    { id: 2, text: "Today's Deals" },
    { id: 3, text: 'Customer Service' },
    { id: 4, text: 'Registry' },
    { id: 5, text: 'Gift Cards' },
    { id: 6, text: 'Sell' }
  ];

  return (
    <div className={`${classes.lower__header} ${isMobileOpen ? classes['lower__header--mobile-open'] : ''}`}>
      <div className={classes.lower__header__container}>
        <ul className={classes.lower__header__list}>
          {menuItems.map((item) => (
            <li key={item.id} className={classes.lower__header__item}>
              {item.icon && <item.icon className={classes.lower__header__icon} />}
              <span className={classes.lower__header__text}>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LowerHeader;