import React, { Fragment, useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Cart/Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(process.env.REACT_APP_ORDERS, {
        method: "POST",
        body: JSON.stringify({ user: userData, orderItems: cartCtx.items }),
        header: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("error in fetch");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      cartCtx.clearItem();
    }
  };

  const cancelSubmitHandler = () => {
    setIsCheckout(false);
    props.onHideCart();
  };

  const orderOnClickedHanlder = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart}>Close</button>
      <button onClick={orderOnClickedHanlder}>Order</button>
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {!isCheckout && cartItems}
      {!isCheckout && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{cartCtx.totalAmount}</span>
        </div>
      )}
      {isCheckout && (
        <Checkout
          onConfirm={orderSubmitHandler}
          onCancel={cancelSubmitHandler}
        />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModal = <p>Order is submitting.....</p>;
  const isSubmittedModal = (
    <>
      <p>Order is submitted</p>
      <div className={classes.actions}>
        <button onClick={props.onHideCart}>Cancell</button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && isSubmittingModal}
      {!isSubmitting && isSubmitted && isSubmittedModal}
    </Modal>
  );
};

export default Cart;
