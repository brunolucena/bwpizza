import { all } from "redux-saga/effects";

import orderPizzaSagas from "./orderPizzaSagas";
import pizzasSagas from "./pizzasSagas";
import snackbarSaga from "./snackbarSaga";

// Cria as Sagas. Todas as sagas devem ser passadas com o spread aqui.
const mySaga = function* rootSaga() {
  yield all([...orderPizzaSagas, ...pizzasSagas, ...snackbarSaga]);
};

export default mySaga;
