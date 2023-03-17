import React, { Fragment } from "react";
import bgImg from "../../assets/image.webp";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Japanese kitchen</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={bgImg} alt="A japanese style room"></img>
      </div>
    </Fragment>
  );
}

export default Header;
