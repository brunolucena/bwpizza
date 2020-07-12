import { RouteProps } from "react-router";

import EscolherMassa from "./EscolherMassa";
import EscolherRecheio from "./EscolherRecheio";
import EscolherTamanho from "./EscolherTamanho";

const orderPizzaRoutes: RouteProps[] = [
  {
    path: "escolher-massa",
    component: EscolherMassa,
    exact: true,
  },
  {
    path: "escolher-tamanho",
    component: EscolherTamanho,
    exact: true,
  },
  {
    path: "",
    component: EscolherRecheio,
    exact: true,
  },
];

export default orderPizzaRoutes;
