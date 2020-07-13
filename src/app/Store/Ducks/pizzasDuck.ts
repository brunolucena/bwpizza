import {
  ActionPayload,
  BaseErrorResponse,
  BaseResponse,
} from "../Models/ReduxModels";
import {
  GetAvailablePizzasRequest,
  GetAvailablePizzasResponse,
  GetRecommendationRequest,
  GetRecommendationResponse,
  SetPizzasDataRequest,
} from "../Models/PizzaModels";

export const GET_AVAILABLE_PIZZAS = "GET_AVAILABLE_PIZZAS";
export const GET_AVAILABLE_PIZZAS_FAILURE = "GET_AVAILABLE_PIZZAS_FAILURE";
export const GET_AVAILABLE_PIZZAS_SUCCESS = "GET_AVAILABLE_PIZZAS_SUCCESS";

export const GET_RECOMMENDATION = "GET_RECOMMENDATION";
export const GET_RECOMMENDATION_FAILURE = "GET_RECOMMENDATION_FAILURE";
export const GET_RECOMMENDATION_SUCCESS = "GET_RECOMMENDATION_SUCCESS";

export const SET_PIZZAS_DATA = "SET_PIZZAS_DATA";

export interface GetAvailablePizzas {
  type: typeof GET_AVAILABLE_PIZZAS;
  payload: ActionPayload<GetAvailablePizzasRequest>;
}
export interface GetAvailablePizzasFailure {
  type: typeof GET_AVAILABLE_PIZZAS_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetAvailablePizzasSuccess {
  type: typeof GET_AVAILABLE_PIZZAS_SUCCESS;
  payload: BaseResponse<GetAvailablePizzasResponse>;
}

export interface GetRecommendation {
  type: typeof GET_RECOMMENDATION;
  payload: ActionPayload<GetRecommendationRequest>;
}
export interface GetRecommendationFailure {
  type: typeof GET_RECOMMENDATION_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetRecommendationSuccess {
  type: typeof GET_RECOMMENDATION_SUCCESS;
  payload: BaseResponse<GetRecommendationResponse>;
}

export interface SetPizzasData {
  type: typeof SET_PIZZAS_DATA;
  payload: SetPizzasDataRequest;
}

export type Actions =
  | GetAvailablePizzas
  | GetAvailablePizzasFailure
  | GetAvailablePizzasSuccess
  | GetRecommendation
  | GetRecommendationFailure
  | GetRecommendationSuccess
  | SetPizzasData;

export interface State {
  error: string;
  loading: boolean;
  availablePizzas: GetAvailablePizzasResponse;
  recommendation: GetRecommendationResponse;
}

const initialState: State = {
  error: "",
  loading: false,
  availablePizzas: {
    massas: [],
    recheios: [],
  },
  recommendation: {
    id: "",
    pizza: {
      massa: {
        additionalPrice: 0,
        id: "",
        name: "Tradicional",
        description: "",
      },
      recheios: [],
      selectedTamanho: "Grande",
    },
    points: 0,
    price: 0,
    text: "",
  },
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case GET_AVAILABLE_PIZZAS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_AVAILABLE_PIZZAS_FAILURE: {
      return {
        ...state,
        error: "Não foi possível carregar as pizzas disponíveis",
        loading: false,
      };
    }
    case GET_AVAILABLE_PIZZAS_SUCCESS: {
      return {
        ...state,
        error: "",
        loading: false,
        availablePizzas: action.payload.data,
      };
    }

    case GET_RECOMMENDATION: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_RECOMMENDATION_FAILURE: {
      return {
        ...state,
        error: "Não foi possível carregar a recomendação",
        loading: false,
      };
    }
    case GET_RECOMMENDATION_SUCCESS: {
      return {
        ...state,
        error: "",
        loading: false,
        recommendation: action.payload.data,
      };
    }

    case SET_PIZZAS_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export function getAvailablePizzas(
  data: GetAvailablePizzasRequest
): GetAvailablePizzas {
  return {
    type: GET_AVAILABLE_PIZZAS,
    payload: {
      request: {
        method: "GET",
        url: "/GetAvailablePizzas",
        data,
      },
    },
  };
}

export function getRecommendation(
  data: GetRecommendationRequest
): GetRecommendation {
  return {
    type: GET_RECOMMENDATION,
    payload: {
      request: {
        method: "GET",
        url: "/GetDailyRecommendation",
        data,
      },
    },
  };
}

export function setPizzasData(data: SetPizzasDataRequest): SetPizzasData {
  return {
    type: SET_PIZZAS_DATA,
    payload: data,
  };
}
