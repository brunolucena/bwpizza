export type TypeMassas = "Tradicional" | "Fina" | "Pan";
export type TypeTamanhos = "Brotinho" | "Pequena" | "Média" | "Grande";

/**
 * Retorna os dados das pizzas disponíveis.
 * Recheios: Array de Recheios. Cada recheio possui seus tamanhos
 * e preços de acordo.
 * Massas: Array de Massas indicando se essa massa inclui algum
 * valor adicional.
 */
export interface GetAvailablePizzasRequest {}
export interface GetAvailablePizzasResponse {
  massas: Massa[];
  recheios: Recheio[];
}

/** Retorna a recomendação do dia se existir. */
export interface GetRecommendationRequest {}
export interface GetRecommendationResponse {
  id: string;
  pizza: Pizza;
  price: number;
  points: number;
  text?: string;
}

/**
 * Faz um pedido de uma pizza. Uma pizza pode ter até dois recheios,
 * dos quais o maior valor será considerado. Caso a pizza venha de
 * uma promoção (recomendação do dia), deve ser passado o promotionId
 * e o promotionalprice correspondetes, que por sua vez devem corresponder
 * a mesma pizza da promoção.
 */
export interface OrderPizzaRequest {
  pizza: Pizza;
  /** Id recebido no GetRecommendation. */
  promotionId?: string;
  /** Price recebido no GetRecommendation. */
  promotionalPrice?: number;
}
export interface OrderPizzaResponse {
  success: boolean;
  /** Data e horário estimado de entrega */
  estimatedArrival?: Date | string;
  /** Texto sobre a entrega. Ex: "Tempo estimado de entrega: 1 hora". */
  estimatedArrivalText?: string;
  orderId: string;
  /** Pontos ganhos pelo pedido. Pode ser 0. */
  pointsEarned: number;
  /** Mensagem sobre o retorno. Ex: Erro na requisição devido id da promoção errado. */
  message?: string;
  viewId: string;
}

/**
 * Uma pizza é feita de uma Massa, de um a dois recheios e um selectedTamanho.
 * O preço é baseado no tamanho selecionado, vendo o preço de cada tamanho
 * correspondente dentro dos recheios, pegando o maior valor e somado ao
 * valor adicional que pode existir na massa.
 */
export interface Pizza {
  massa: Massa;
  recheios: Recheio[];
  selectedTamanho: TypeTamanhos;
}

/**
 * Algumas massas podem ter um valor adicional.
 */
export interface Massa {
  id: string;
  name: TypeMassas;
  /** Caso não tenha valor adicional, retorna 0. */
  additionalPrice: number;
  description?: string;
}

/**
 * O Tamanho está sempre dentro de um recheio, dessa forma, cada
 * recheio pode ter um valor diferente pra cada tamanho.
 */
export interface Tamanho {
  name: TypeTamanhos;
  price: number;
  description?: string;
}

export interface Recheio {
  id: string;
  name: string;
  /** O preço de um recheio está relacionado aos tamanhos disponíveis. */
  tamanhos: Tamanho[];
  description?: string;
}

/**
 * Interface utilizada para atualizar os dados da orderPizzaDuck.ts
 */
export interface SetOrderPizzaDataRequest {
  error?: string;
  loading?: boolean;
  doisRecheios?: boolean;
  orderPizzaResponse?: OrderPizzaResponse;
  pizza?: Pizza;
  promotionSelected?: boolean;
  selectedMassa?: Massa | null;
  selectedTamanho?: TypeTamanhos | "";
}

/**
 * Interface utilizada para atualizar os dados da pizzasDuck.ts
 */
export interface SetPizzasDataRequest {
  error?: string;
  loading?: boolean;
  availablePizzas?: GetAvailablePizzasResponse;
  recommendation?: GetRecommendationResponse;
}

/**
 * Dados do pedido.
 */
export interface OrderPizzaPrice {
  additionals: OrderPizzaAdditionals[];
  recheio: number;
  total: number;
}

/**
 * Adicionais da pizza.
 */
export interface OrderPizzaAdditionals {
  name: string;
  price: number;
}
