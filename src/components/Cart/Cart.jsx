import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
const Cart = () => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: 1, name: "Sushi", amount: 1 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>30.38</span>
      </div>
      <div className={classes.actions}>
        <button>Close</button>
        <button>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
