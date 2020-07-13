import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";

import "./styles.scss";

import orderPizzaRoutes from "./order-pizza.routes";
import { getAvailablePizzas } from "../Store/Ducks/pizzasDuck";

import OrderRecommendation from "./OrderRecommendation";
import OrderStepper from "./OrderStepper";
import OrderSummary from "./OrderSummary";

interface Props {}

const OrderPizza: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const router = useRouteMatch();

  console.log({ router2: router });

  useEffect(() => {
    dispatch(getAvailablePizzas({}));
  }, [dispatch]);

  return (
    <div className="order-pizza-wrapper">
      <div className="recommendation-wrapper">
        <OrderRecommendation />
      </div>

      <section className="order-pizza-container">
        <div className="order-pizza-area">
          <div className="top">
            <OrderStepper />
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
    </div>
  );
};

export default OrderPizza;
