import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li class={classes.meal}>
      <div>
        <h3>{props.title}</h3>
        <div class={classes.description}>{props.description}</div>
        <div class={classes.price}>{price}</div>
      </div>
      <MealItemForm id={props.id}/>
    </li>
  );
};

export default MealItem;
