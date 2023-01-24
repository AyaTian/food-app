import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Cart/Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

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

  // const handleSubmitOrder=async ()=>{
  //   try {
  //     const response = await fetch(
  //       "https://food-order-f3c82-default-rtdb.europe-west1.firebasedatabase.app/orders",
  //       {
  //         method: "POST",
  //         body: JSON.stringify(cartCtx.items),
  //         header: { "Content-type": "application/json" },
  //       }
  //     );
  //   }catch{}
  // }
  const orderOnClickedHanlder = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart}>Close</button>
      <button onClick={orderOnClickedHanlder}>Order</button>
    </div>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartCtx.totalAmount}</span>
      </div>
      {isCheckout && <Checkout />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
