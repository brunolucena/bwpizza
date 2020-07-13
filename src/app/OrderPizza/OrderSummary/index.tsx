import React from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./styles.scss";

import ButtonBase from "@material-ui/core/ButtonBase";

import { formatCurrency } from "../../Core/Helpers/formatters";

import { BWPizzaStore } from "../../Store";
import { OrderPizzaAdditionals } from "../../Store/Models/PizzaModels";
import {
  orderPizza,
  selectOrderPizzaPrice,
  selectActiveStepByPathname,
  selectAllStepsValid,
} from "../../Store/Ducks/orderPizzaDuck";

interface Props {}

const OrderSummary: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { orderPizza: orderPizzaRedux, pizzas } = useSelector(
    (state: BWPizzaStore) => state
  );

  // Pega o número do step atual. Ex: 0.
  const currentStep = selectActiveStepByPathname(location.pathname);

  // Pega o objeto com os preços do pedido.
  const price = selectOrderPizzaPrice(orderPizzaRedux, pizzas);

  const {
    orderPizzaResponse,
    pizza,
    promotionSelected,
    selectedMassa,
    selectedTamanho,
  } = orderPizzaRedux;
  const { recommendation } = pizzas;

  // Verifica se todos os passos estão válidos.
  const allStepsValid = selectAllStepsValid(orderPizzaRedux);

  /**
   * Dispara para a API o pedido.
   */
  function handleMakeOrder() {
    dispatch(
      orderPizza({
        pizza,
        promotionId: promotionSelected ? recommendation.id : "",
        promotionalPrice: promotionSelected ? recommendation.price : 0,
      })
    );
  }

  function renderButton() {
    /**
     * Pega o texto do botão de acordo com o passo atual.
     */
    const getButtonText = (): string => {
      switch (currentStep) {
        case 0:
        case 1: {
          return "AVANÇAR";
        }

        case 2: {
          return "FINALIZAR PEDIDO";
        }

        default: {
          return "AVANÇAR";
        }
      }
    };

    /**
     * Se estiver no último passo, dispara a ação de fazer o pedido.
     * Se não avança pro próximo passo.
     */
    const handleClick = () => {
      let to = "/";

      if (currentStep === 0) {
        to = "/escolher-tamanho";
      } else if (currentStep === 1) {
        to = "/escolher-massa";
      } else {
        handleMakeOrder();

        return;
      }

      history.push(to);
    };

    // Se estiver no último passo mas ainda faltar alguma informação,
    // desativa o botão.
    const disabled = currentStep === 2 && !allStepsValid;

    return (
      <ButtonBase
        className="button-avancar"
        disabled={disabled}
        onClick={handleClick}
      >
        <div>{getButtonText()}</div>
      </ButtonBase>
    );
  }

  function renderPizzaDetails() {
    return (
      <div className="pizza-details">
        <div className="item">
          <span className="left">Sabor: </span>

          <span className="right">
            {pizza.recheios?.map((recheio, index) => {
              if (index === 0) {
                return recheio.name;
              } else {
                return ` + ${recheio.name}`;
              }
            })}
          </span>
        </div>

        <div className="item">
          <span className="left">Tamanho: </span>

          <span className="right">{selectedTamanho}</span>
        </div>

        <div className="item">
          <span className="left">Massa: </span>

          <span className="right">{selectedMassa?.name}</span>
        </div>
      </div>
    );
  }

  function renderPizzaPriceDetails() {
    function renderAdditional(additional: OrderPizzaAdditionals) {
      const { name, price } = additional;

      return (
        <div className="item">
          <span className="left">{name}: </span>

          <span className="right">+{formatCurrency(price)}</span>
        </div>
      );
    }

    return (
      <div className="pizza-price-wrapper">
        <span className="total">Total: {formatCurrency(price.total)}</span>

        <div className="price-details">
          {price.recheio > 0 && (
            <div className="item">
              <span className="left">Pizza: </span>
              <span className="right">{formatCurrency(price.recheio)}</span>
            </div>
          )}

          {price.additionals.length > 0
            ? price.additionals.map((additional) =>
                renderAdditional(additional)
              )
            : "S/ adicionais"}
        </div>
      </div>
    );
  }

  // Ao realizar um pedido com sucesso, redireciona para a
  // página de sucesso.
  if (orderPizzaResponse.success) {
    return <Redirect to="/pedido-sucesso" />;
  }

  return (
    <section className="order-summary-container">
      <div className="top">MINHA PIZZA</div>

      <div className="content">
        {renderPizzaDetails()}
        {renderPizzaPriceDetails()}
        {renderButton()}
      </div>
    </section>
  );
};

export default OrderSummary;
