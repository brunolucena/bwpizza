import { RouteProps } from "react-router";

import OrderPizza from "./OrderPizza";
import OrderSuccess from "./OrderSuccess";

const appRoutes: RouteProps[] = [
  {
    path: "/pedido-sucesso",
    component: OrderSuccess,
    exact: true,
  },
  {
    path: "/",
    component: OrderPizza,
  },
];

export default appRoutes;
