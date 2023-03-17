import { useReducer } from "react";
import CartItemListContext from "./cart-context";

const defaultCartState = {
  items: [],
  amount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      amount: state.amount + action.item.price * action.item.amount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.amount - existingCartItem.price;
 
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      amount: updatedTotalAmount,
    };
  }

  if(action.type==="CLEAR"){
    return defaultCartState;
  }

  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToListHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromListHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearItemFromListHandler =() =>{
    dispatchCartAction({type:"CLEAR"})
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.amount,
    addItem: addItemToListHandler,
    removeItem: removeItemFromListHandler,
    clearItem: clearItemFromListHandler,
  };
  return (
    <CartItemListContext.Provider value={cartContext}>
      {props.children}
    </CartItemListContext.Provider>
  );
};

export default CartProvider;
