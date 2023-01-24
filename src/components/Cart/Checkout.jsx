import React from "react";
import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: nameInputValue,
    isValid: nameInputIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameValueChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: streetInputValue,
    isValid: streetInputIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetValueChangeHandler,
    inputBlurHandler: streetInputBlurHandler,
    reset: streetInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: postCodeInputValue,
    isValid: postCodeInputIsValid,
    hasError: postCodeInputHasError,
    valueChangeHandler: postCodeValueChangeHandler,
    inputBlurHandler: postCodeInputBlurHandler,
    reset: postCodeInputReset,
  } = useInput((value) => value.trim() !== "" && value.length < 7);
  const {
    value: phoneInputValue,
    isValid: phoneInputIsValid,
    hasError: phoneInputHasError,
    valueChangeHandler: phoneValueChangeHandler,
    inputBlurHandler: phoneInputBlurHandler,
    reset: phoneInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    nameInputIsValid &&
    streetInputIsValid &&
    postCodeInputIsValid &&
    phoneInputIsValid
  ) {
    formIsValid = true;
  }
  const handleConfirm = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    } else {
      nameInputReset();
      streetInputReset();
      postCodeInputReset();
      phoneInputReset();
    }
  };

  const nameControlClasses = `${classes.control} ${
    nameInputIsValid ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    streetInputIsValid ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    postCodeInputIsValid ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    phoneInputIsValid ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={handleConfirm} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={nameInputValue}
          onBlur={nameInputBlurHandler}
          onChange={nameValueChangeHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Please input your first name</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          value={streetInputValue}
          onBlur={streetInputBlurHandler}
          onChange={streetValueChangeHandler}
        />
        {streetInputHasError && (
          <p className="error-text">Please input your name</p>
        )}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postCode">Post Code</label>
        <input
          id="postCode"
          type="text"
          value={postCodeInputValue}
          onBlur={postCodeInputBlurHandler}
          onChange={postCodeValueChangeHandler}
        />
        {postCodeInputHasError && (
          <p className="error-text">Please input your post code</p>
        )}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="">Phone</label>
        <input
          id="phone"
          type="text"
          value={phoneInputValue}
          onBlur={phoneInputBlurHandler}
          onChange={phoneValueChangeHandler}
        />
        {phoneInputHasError && (
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
