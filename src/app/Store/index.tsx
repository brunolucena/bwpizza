import snackbar, { State as SnackbarState } from "./Ducks/snackbarDuck";

// interface da store. Todas as redux (ducks) devem ter seu State declarado aqui
export interface BWPizzaStore {
  snackbar: SnackbarState;
}

// a redux em si
const reducers: any = {
  snackbar,
};

export default reducers;
