import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);

  const fetchMealsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://food-order-f3c82-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("error in fetch");
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        const meal = {
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        };
        loadedMeals.push(meal);
      }
      setMeals(loadedMeals);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMealsData();
  }, []);

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{!isLoading && <ul>{mealList}</ul>}</Card>
    </section>
  );
};

export default AvailableMeals;
