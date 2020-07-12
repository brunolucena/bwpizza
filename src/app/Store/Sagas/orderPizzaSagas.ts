import { call, put, takeLatest } from "redux-saga/effects";
import { Action } from "../Models/ReduxModels";

import Api from "../Services/Api";

import { OrderPizzaRequest } from "../Models/PizzaModels";
import {
  ORDER_PIZZA,
  ORDER_PIZZA_FAILURE,
  ORDER_PIZZA_SUCCESS,
} from "../Ducks/orderPizzaDuck";

export function* orderPizzaSaga(action: Action<OrderPizzaRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({
      type: ORDER_PIZZA_SUCCESS,
      payload: { data: payload },
    });
  } catch (error) {
    yield put({
      type: ORDER_PIZZA_FAILURE,
      payload: { success: false, errors: [error] },
    });
  }
}

export default [takeLatest(ORDER_PIZZA, orderPizzaSaga)];
