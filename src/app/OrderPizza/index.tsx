import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";

import "./styles.scss";

import orderPizzaRoutes from "./order-pizza.routes";
import {
  getAvailablePizzas,
  getRecommendation,
} from "../Store/Ducks/pizzasDuck";

import OrderStepper from "./OrderStepper";
import OrderSummary from "./OrderSummary";
import OrderRecommendation from "./OrderRecommendation";

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
      <div className="order-pizza-area">
        <div className="top">
          <OrderStepper />

          <div className="recommendation-wrapper">
            <OrderRecommendation />
          </div>
        </div>

        <div className="content">
          <div className="left">
            {orderPizzaRoutes.map(({ component, exact, path }, i) => (
              <Route
                path={`${router.path}${path}`}
                component={component}
                key={i}
                exact={exact}
              />
            ))}
          </div>

          <div className="right">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPizza;
