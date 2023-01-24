import React, { Fragment } from "react";
import meals from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Italy kitchen</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="A table full of delicious food"></img>
      </div>
    </Fragment>
  );
}

export default Header;
