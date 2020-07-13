import { put, takeLatest } from "redux-saga/effects";
import { Action } from "../Models/ReduxModels";

import { OPEN_SNACKBAR, OpenSnackbar } from "../Ducks/snackbarDuck";
import {
  GET_AVAILABLE_PIZZAS_FAILURE,
  GET_RECOMMENDATION_FAILURE,
} from "../Ducks/pizzasDuck";
import { ORDER_PIZZA_FAILURE } from "../Ducks/orderPizzaDuck";

// retorna uma mensagem de acordo com o TYPE da action que deu erro
// declarada no getAllFailuresSaga
function getFailureMessage(type: string): string {
  switch (type) {
    case GET_AVAILABLE_PIZZAS_FAILURE: {
      return "Não foi possível pegar as pizzas disponíveis.";
    }

    case GET_RECOMMENDATION_FAILURE: {
      return "Não foi possível pegar a recomendação.";
    }

    case ORDER_PIZZA_FAILURE: {
      return "Não foi possível concluir seu pedido. Tente novamente.";
    }

    default: {
      return "Ocorreu um erro. Por favor tente novamente.";
    }
  }
}

// retorna uma mensagem de acordo com o TYPE da action que deu sucesso
// declarada no getAllSuccessSaga
function getSuccessMessage(type: string): string {
  switch (type) {
    default: {
      return "Informações salvas com sucesso";
    }
  }
}

// trata os errors das TYPEs declaradas no takeLatest do export default
export function* getAllFailuresSaga(action: any) {
  try {
    const data: OpenSnackbar = {
      type: OPEN_SNACKBAR,
      payload: {
        message: getFailureMessage(action?.type || ""),
        style: "error",
      },
    };

    yield put(data);
  } catch (e) {
    console.log({ e });
  }
}

// trata os success das TYPEs declaradas no takeLatest do export default
export function* getAllSuccessSaga(action: Action<any>) {
  try {
    const data: OpenSnackbar = {
      type: OPEN_SNACKBAR,
      payload: {
        message: getSuccessMessage(action?.type || ""),
        style: "success",
      },
    };

    yield put(data);
  } catch (e) {
    console.log({ e });
  }
}

export default [
  takeLatest(
    [
      GET_AVAILABLE_PIZZAS_FAILURE,
      GET_RECOMMENDATION_FAILURE,
      ORDER_PIZZA_FAILURE,
    ],
    getAllFailuresSaga
  ),
  takeLatest([], getAllSuccessSaga),
];
