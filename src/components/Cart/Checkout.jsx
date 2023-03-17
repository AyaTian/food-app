import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChart = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postCode: true,
    phone: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postCodeInputRef = useRef();
  const phoneInputRef = useRef();

  const handleConfirm = (event) => {
    event.preventDefault();

    const nameInputIsValid = !isEmpty(nameInputRef.current.value);
    const streetInputIsValid = !isEmpty(streetInputRef.current.value);
    const postCodeInputIsValid = isSixChart(postCodeInputRef.current.value);
    const phoneInputIsValid = !isEmpty(nameInputRef.current.value);

    setFormInputsValidity({
      name: nameInputIsValid,
      street: streetInputIsValid,
      postCode: postCodeInputIsValid,
      phone: phoneInputIsValid,
    });

    let formIsValid = false;
    if (
      nameInputIsValid &&
      streetInputIsValid &&
      postCodeInputIsValid &&
      phoneInputIsValid
    ) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }
    // Send call
    props.onConfirm({
      name: nameInputRef.current.value,
      street: streetInputRef.current.value,
      postCode: postCodeInputRef.current.value,
      phone: phoneInputRef.current.value,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={handleConfirm} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!formInputsValidity.name && (
          <p className="error-text">Please input your first name</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInputRef} />
        {!formInputsValidity.street && (
          <p className="error-text">Please input your name</p>
        )}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postCode">Post Code</label>
        <input id="postCode" type="text" ref={postCodeInputRef} />
        {!formInputsValidity.postCode && (
          <p className="error-text">Please input your post code</p>
        )}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="">Phone</label>
        <input id="phone" type="text" ref={phoneInputRef} />
        {!formInputsValidity.phone && (
          <p className="error-text">Please input your phone</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
