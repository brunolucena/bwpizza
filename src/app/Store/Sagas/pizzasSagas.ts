import { call, put, takeLatest } from "redux-saga/effects";
import { Action } from "../Models/ReduxModels";

import Api from "../Services/Api";

import {
  GetAvailablePizzasRequest,
  GetRecommendationRequest,
} from "../Models/PizzaModels";
import {
  GET_AVAILABLE_PIZZAS,
  GET_AVAILABLE_PIZZAS_FAILURE,
  GET_AVAILABLE_PIZZAS_SUCCESS,
  GET_RECOMMENDATION,
  GET_RECOMMENDATION_FAILURE,
  GET_RECOMMENDATION_SUCCESS,
} from "../Ducks/pizzasDuck";

export function* getAvailablePizzasSaga(
  action: Action<GetAvailablePizzasRequest>
) {
  try {
    const payload = yield call(Api, action);

    yield put({
      type: GET_AVAILABLE_PIZZAS_SUCCESS,
      payload: { data: payload },
    });
  } catch (error) {
    yield put({
      type: GET_AVAILABLE_PIZZAS_FAILURE,
      payload: { success: false, errors: [error] },
    });
  }
}
export function* getRecommendationSaga(
  action: Action<GetRecommendationRequest>
) {
  try {
    const payload = yield call(Api, action);

    yield put({ type: GET_RECOMMENDATION_SUCCESS, payload: { data: payload } });
  } catch (error) {
    yield put({
      type: GET_RECOMMENDATION_FAILURE,
      payload: { success: false, errors: [error] },
    });
  }
}

export default [
  takeLatest(GET_AVAILABLE_PIZZAS, getAvailablePizzasSaga),
  takeLatest(GET_RECOMMENDATION, getRecommendationSaga),
];
