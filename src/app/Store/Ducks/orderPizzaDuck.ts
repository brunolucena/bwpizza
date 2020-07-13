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

import { State as PizzasState } from "./pizzasDuck";

export const CLEAR_ORDER_PIZZA = "CLEAR_ORDER_PIZZA";

export const ORDER_PIZZA = "ORDER_PIZZA";
export const ORDER_PIZZA_FAILURE = "ORDER_PIZZA_FAILURE";
export const ORDER_PIZZA_SUCCESS = "ORDER_PIZZA_SUCCESS";

export const SET_MASSA = "SET_MASSA";
export const SET_TAMANHO = "SET_TAMANHO";

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

export interface SetMassa {
  type: typeof SET_MASSA;
  payload: Massa;
}

export interface SetTamanho {
  type: typeof SET_TAMANHO;
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
  | SetMassa
  | SetTamanho
  | SetOrderPizzaData
  | ToggleRecheio;

export interface State {
  error: string;
  loading: boolean;
  orderPizzaResponse: OrderPizzaResponse;
  pizza: Pizza;
  /** Caso tenha qualquer alteração na pizza, a promoção é retirada */
  promotionSelected: boolean;
  selectedMassa: Massa | null;
  selectedTamanho: TypeTamanhos | "";
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
  selectedMassa: null,
  selectedTamanho: "",
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

    case SET_MASSA: {
      // Cria uma cópia da pizza no state.
      const newPizza = { ...state.pizza };

      // Coloca a nova massa.
      newPizza.massa = action.payload;

      return {
        ...state,
        pizza: newPizza,
        promotionSelected: false,
        selectedMassa: action.payload,
      };
    }

    case SET_TAMANHO: {
      // Cria uma cópia da pizza no state.
      const newPizza = { ...state.pizza };

      // Coloca o novo tamanho selecionado.
      newPizza.selectedTamanho = action.payload;

      return {
        ...state,
        pizza: newPizza,
        promotionSelected: false,
        selectedTamanho: action.payload,
      };
    }

    case SET_ORDER_PIZZA_DATA: {
      return {
        ...state,
        ...action.payload,
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
export function setMassa(data: Massa): SetMassa {
  return {
    type: SET_MASSA,
    payload: data,
  };
}

/**
 * Seleciona o tamanho da pizza.
 */
export function setTamanho(data: TypeTamanhos): SetTamanho {
  return {
    type: SET_TAMANHO,
    payload: data,
  };
}

/**
 * Seta dados da redux.
 */
export function setOrderPizzaData(
  data: SetOrderPizzaDataRequest
): SetOrderPizzaData {
  return {
    type: SET_ORDER_PIZZA_DATA,
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
 * Retorna o step atual baseado na rota.
 */
export function selectCurrentStep(pathname: string): number {
  if (pathname === "/") {
    return 0;
  } else if (pathname === "/escolher-tamanho") {
    return 1;
  } else if (pathname === "/escolher-massa") {
    return 2;
  }

  return 0;
}

/**
 * Verifica se as condições para a conclusão de um determinado passo
 * foram atingidas.
 */
export function selectIsStepValid(state: State, step: number): boolean {
  const { pizza, selectedMassa, selectedTamanho } = state;

  /**
   * Retorna true se o pelo menos um recheio já foi selecionado.
   */
  if (step === 0) {
    return pizza.recheio.length > 0;
  }

  /**
   * Retorna true se o tamanho já foi selecionado.
   */
  if (step === 1) {
    return !!selectedTamanho;
  }

  /**
   * Retorna true se a massa já foi selecionada.
   */
  if (step === 2) {
    return !!selectedMassa;
  }

  return false;
}

/**
 * Verifica se todas as condições para realizar um pedido
 * foram atingidas.
 */
export function selectAllStepsValid(state: State): boolean {
  const step1Valid = selectIsStepValid(state, 0);
  const step2Valid = selectIsStepValid(state, 1);
  const step3Valid = selectIsStepValid(state, 2);

  const allValid = step1Valid && step2Valid && step3Valid;

  return allValid;
}

/**
 * Retorna um objeto contendo o valor total da pizza e um array
 * com o valor de cada adicional do pedido.
 * Caso a pizza da promoção esteja selecionada, retorna o valor da promoção.
 */
export function selectOrderPizzaPrice(
  state: State,
  pizzasState: PizzasState
): OrderPizzaPrice {
  const { pizza, promotionSelected, selectedTamanho } = state;
  const { recommendation } = pizzasState;

  // Se a promoção estiver selecionada, retorna os valores dela.
  if (promotionSelected) {
    return {
      additionals: [],
      recheio: recommendation.price,
      total: recommendation.price,
    };
  }

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
