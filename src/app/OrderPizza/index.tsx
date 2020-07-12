import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";

import "./styles.scss";

import orderPizzaRoutes from "./order-pizza.routes";
import {
  getAvailablePizzas,
  getRecommendation,
} from "../Store/Ducks/pizzasDuck";

interface Props {}

const OrderPizza: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouteMatch();

  useEffect(() => {
    dispatch(getAvailablePizzas({}));
    dispatch(getRecommendation({}));
  }, [dispatch]);

  return (
    <section className="order-pizza-container">
      OrderPizza
      <div className="component-area">
        {orderPizzaRoutes.map(({ component, exact, path }, i) => (
          <Route
            path={`${router.path}${path}`}
            component={component}
            key={i}
            exact={exact}
          />
        ))}
      </div>
    </section>
  );
};

export default OrderPizza;
