import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  return (
    <button class={classes.button}>
      <span class={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span class={classes.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
