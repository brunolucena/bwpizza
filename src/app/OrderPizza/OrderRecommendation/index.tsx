import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";

import { formatCurrency } from "../../Core/Helpers/formatters";

import { BWPizzaStore } from "../../Store";
import { OrderPizzaAdditionals } from "../../Store/Models/PizzaModels";
import { getRecommendation } from "../../Store/Ducks/pizzasDuck";
import { selectOrderPizzaPrice } from "../../Store/Ducks/orderPizzaDuck";

interface Props {}

const OrderRecommendation: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const { orderPizza } = useSelector((state: BWPizzaStore) => state);

  const price = selectOrderPizzaPrice(orderPizza);

  const { pizza } = orderPizza;

  useEffect(() => {
    dispatch(getRecommendation({}));
  }, [dispatch]);

  function renderPizzaDetails() {
    return (
      <div className="pizza-details">
        <div className="item">
          <span className="left">Sabor:</span>

          <span className="right">
            {pizza.recheio.map((recheio, index) => {
              if (index === 0) {
                return recheio;
              } else {
                return ` + ${recheio}`;
              }
            })}
          </span>
        </div>

        <div className="item">
          <span className="left">Tamanho:</span>

          <span className="right">{pizza.selectedTamanho}</span>
        </div>

        <div className="item">
          <span className="left">Massa:</span>

          <span className="right">{pizza.massa.name}</span>
        </div>
      </div>
    );
  }

  function renderPizzaPriceDetails() {
    function renderAdditional(additional: OrderPizzaAdditionals) {
      const { name, price } = additional;

      return (
        <div className="item">
          <span className="left">{name}</span>

          <span className="right">+ {formatCurrency(price)}</span>
        </div>
      );
    }

    return (
      <div className="pizza-price-wrapper">
        <span className="total">{formatCurrency(price.total)}</span>

        <div className="price-details">
          {price.recheio > 0 && (
            <div className="item">
              <span className="left">Pizza:</span>
              <span className="right">{formatCurrency(price.recheio)}</span>
            </div>
          )}

          {price.additionals.map((additional) => renderAdditional(additional))}
        </div>
      </div>
    );
  }

  return (
    <section className="order-recommendation-container">
      <div className="top">MINHA PIZZA</div>

      <div className="content">
        {renderPizzaDetails()}
        {renderPizzaPriceDetails()}
      </div>
    </section>
  );
};

export default OrderRecommendation;
