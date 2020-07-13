import orderPizza, { State as OrderPizzaState } from "./Ducks/orderPizzaDuck";
import pizzas, { State as PizzasState } from "./Ducks/pizzasDuck";
import snackbar, { State as SnackbarState } from "./Ducks/snackbarDuck";

// Interface da store. Todas as redux (ducks) devem ter seu State declarado aqui.
export interface BWPizzaStore {
  orderPizza: OrderPizzaState;
  pizzas: PizzasState;
  snackbar: SnackbarState;
}

// Objeto da store (redux).
const reducers: any = {
  orderPizza,
  pizzas,
  snackbar,
};

export default reducers;
