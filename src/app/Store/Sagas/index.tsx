import { all } from "redux-saga/effects";

import snackbarSaga from "./snackbarSaga";

// Cria as Sagas. Todas as sagas devem ser passadas com o spread aqui
const mySaga = function* rootSaga() {
  yield all([...snackbarSaga]);
};

export default mySaga;
