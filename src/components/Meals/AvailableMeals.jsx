import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  const fetchMealsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_DISHES);
      if (!response.ok) {
        throw new Error("error in fetch");
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        const meal = {
          id: key,
          name: data[key].title,
          description: data[key].description,
          price: data[key].price,
          image: data[key].image,
        };
        loadedMeals.push(meal);
      }
      setMeals(loadedMeals);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMealsData();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }
  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      image={meal.image}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{!isLoading && <ul>{mealList}</ul>}</Card>
    </section>
  );
};

export default AvailableMeals;
