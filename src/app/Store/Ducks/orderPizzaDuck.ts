import {
  ActionPayload,
  BaseErrorResponse,
  BaseResponse,
} from "../Models/ReduxModels";
import {
  Massa,
  OrderPizzaAdditionals,
  OrderPizzaPrice,
  OrderPizzaRequest,
  OrderPizzaResponse,
  Pizza,
  Recheio,
  SetOrderPizzaDataRequest,
  TypeTamanhos,
} from "../Models/PizzaModels";

export const CLEAR_ORDER_PIZZA = "CLEAR_ORDER_PIZZA";

export const ORDER_PIZZA = "ORDER_PIZZA";
export const ORDER_PIZZA_FAILURE = "ORDER_PIZZA_FAILURE";
export const ORDER_PIZZA_SUCCESS = "ORDER_PIZZA_SUCCESS";

export const SELECT_MASSA = "SELECT_MASSA";
export const SELECT_TAMANHO = "SELECT_TAMANHO";

export const SET_ORDER_PIZZA_DATA = "SET_ORDER_PIZZA_DATA";

export const TOGGLE_RECHEIO = "TOGGLE_RECHEIO";

export interface ClearOrderPizza {
  type: typeof CLEAR_ORDER_PIZZA;
}

export interface OrderPizza {
  type: typeof ORDER_PIZZA;
  payload: ActionPayload<OrderPizzaRequest>;
}
export interface OrderPizzaFailure {
  type: typeof ORDER_PIZZA_FAILURE;
  payload: BaseErrorResponse;
}
export interface OrderPizzaSuccess {
  type: typeof ORDER_PIZZA_SUCCESS;
  payload: BaseResponse<OrderPizzaResponse>;
}

export interface SelectMassa {
  type: typeof SELECT_MASSA;
  payload: Massa;
}

export interface SelectTamanho {
  type: typeof SELECT_TAMANHO;
  payload: TypeTamanhos;
}

export interface SetOrderPizzaData {
  type: typeof SET_ORDER_PIZZA_DATA;
  payload: SetOrderPizzaDataRequest;
}

export interface ToggleRecheio {
  type: typeof TOGGLE_RECHEIO;
  payload: Recheio;
}

export type Actions =
  | ClearOrderPizza
  | OrderPizza
  | OrderPizzaFailure
  | OrderPizzaSuccess
  | SelectMassa
  | SelectTamanho
  | ToggleRecheio;

export interface State {
  error: string;
  loading: boolean;
  orderPizzaResponse: OrderPizzaResponse;
  pizza: Pizza;
  promotionSelected: boolean;
  selectedTamanho: TypeTamanhos;
}

const initialState: State = {
  error: "",
  loading: false,
  orderPizzaResponse: {
    pointsEarned: 0,
    success: false,
    estimatedArrival: undefined,
    estimatedArrivalText: "",
    message: "",
  },
  pizza: {
    massa: {
      additionalPrice: 0,
      id: "",
      name: "Tradicional",
    },
    recheio: [],
    selectedTamanho: "Grande",
  },
  promotionSelected: false,
  selectedTamanho: "Grande",
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case CLEAR_ORDER_PIZZA: {
      return {
        ...initialState,
      };
    }

    case ORDER_PIZZA: {
      return {
        ...state,
        loading: true,
      };
    }
    case ORDER_PIZZA_FAILURE: {
      return {
        ...state,
        error: "Não foi possível carregar as pizzas disponíveis",
        loading: false,
      };
    }
    case ORDER_PIZZA_SUCCESS: {
      return {
        ...state,
        error: "",
        loading: false,
        orderPizzaResponse: action.payload.data,
      };
    }

    case SELECT_MASSA: {
      // Cria uma cópia da pizza no state.
      const newPizza = { ...state.pizza };

      // Coloca a nova massa.
      newPizza.massa = action.payload;

      return {
        ...state,
        pizza: newPizza,
        promotionSelected: false,
      };
    }

    case SELECT_TAMANHO: {
      return {
        ...state,
        promotionSelected: false,
        selectedTamanho: action.payload,
      };
    }

    case TOGGLE_RECHEIO: {
      // Pega os dados do recheio.
      const recheio = action.payload;
      // Cria uma cópia da pizza no state.
      const newPizza = { ...state.pizza };

      // Verifica se o recheio já está adicionado na pizza
      const foundIndex = state.pizza.recheio.findIndex(
        (r) => r.id === recheio.id
      );

      // Se o recheio não estiver adicionado na pizza, adiciona.
      if (foundIndex === -1) {
        newPizza.recheio.push(recheio);
      } else {
        // Se já estiver adicionado, retira.
        newPizza.recheio.filter((r) => r.id !== recheio.id);
      }

      return {
        ...state,
        pizza: newPizza,
        promotionSelected: false,
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Limpa a duck do orderPizza.
 */
export function clearOrderPizza(): ClearOrderPizza {
  return {
    type: CLEAR_ORDER_PIZZA,
  };
}

/**
 * Faz a chamada para a API com o pedido da pizza.
 */
export function orderPizza(data: OrderPizzaRequest): OrderPizza {
  return {
    type: ORDER_PIZZA,
    payload: {
      request: {
        method: "POST",
        url: "/OrderPizza",
        data,
      },
    },
  };
}

/**
 * Seleciona a massa da pizza.
 */
export function selectMassa(data: Massa): SelectMassa {
  return {
    type: SELECT_MASSA,
    payload: data,
  };
}

/**
 * Seleciona o tamanho da pizza.
 */
export function selectTamanho(data: TypeTamanhos): SelectTamanho {
  return {
    type: SELECT_TAMANHO,
    payload: data,
  };
}

/**
 * Alterna um tipo de recheio.
 */
export function toggleRecheio(data: Recheio): ToggleRecheio {
  return {
    type: TOGGLE_RECHEIO,
    payload: data,
  };
}

// selectors

/**
 * Retorna um objeto contendo o valor total da pizza e um array
 * com o valor de cada adicional do pedido.
 */
export function selectOrderPizzaPrice(state: State): OrderPizzaPrice {
  const { pizza, selectedTamanho } = state;

  // Transforma o array de recheios em um array somente com os preços
  // de cada recheio de acordo com o tamanho selecionado.
  const recheiosPrices = pizza.recheio.map((recheio) => {
    const tamanho = recheio.tamanhos.find((t) => t.name === selectedTamanho);

    return tamanho?.price || 0;
  });

  // Pega o maior valor dentre os recheios selecionados.
  const highestRecheioPrice = recheiosPrices.reduce(
    (previousValue, currentValue) => {
      if (currentValue > previousValue) {
        return currentValue;
      } else {
        return previousValue;
      }
    },
    0
  );

  // Cria um array de valores adicionais do pedido.
  const additionals: OrderPizzaAdditionals[] = [];

  // Se a massa possuir adicional, coloca no array de adicionais.
  if (pizza.massa.additionalPrice) {
    additionals.push({
      name: `Massa ${pizza.massa.name}`,
      price: pizza.massa.additionalPrice,
    });
  }

  // Valor final da pizza. Soma do maior recheio com todos os adicionais.
  let total = 0;

  additionals.forEach((additional) => (total += additional.price));
  total += highestRecheioPrice;

  return {
    additionals,
    recheio: highestRecheioPrice,
    total,
  };
}
