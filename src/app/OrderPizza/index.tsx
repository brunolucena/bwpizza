import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import "./styles.scss";

import orderPizzaRoutes from "./order-pizza.routes";

interface Props {}

const OrderPizza: React.FC<Props> = () => {
  const router = useRouteMatch();

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
