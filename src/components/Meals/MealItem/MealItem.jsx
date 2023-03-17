import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `€${props.price.toFixed(2)}`;

  const addToChartHandler = (amount) => {
    const item = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    };
    cartCtx.addItem(item);
  };
  return (
    <li className={classes.meal}>
      <div className={classes.info}>
        <img src={props.image} alt={props.name} className={classes.photo} />
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
      </div>
      <MealItemForm id={props.id} onAddToCart={addToChartHandler} />
    </li>
  );
};

export default MealItem;
