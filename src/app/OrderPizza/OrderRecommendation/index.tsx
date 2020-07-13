import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";

import { ButtonBase } from "@material-ui/core";

import { formatCurrency } from "../../Core/Helpers/formatters";

import { BWPizzaStore } from "../../Store";
import { getRecommendation } from "../../Store/Ducks/pizzasDuck";
import { setOrderPizzaData } from "../../Store/Ducks/orderPizzaDuck";

interface Props {}

const OrderRecommendation: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const { pizzas } = useSelector((state: BWPizzaStore) => state);

  const { recommendation } = pizzas;

  const { id, pizza, points, price, text } = recommendation;

  useEffect(() => {
    dispatch(getRecommendation({}));
  }, [dispatch]);

  /**
   * Coloca a pizza da promoção no pedido e define a promoção
   * como true.
   */
  function handleClick() {
    dispatch(
      setOrderPizzaData({
        pizza,
        promotionSelected: true,
        selectedMassa: pizza.massa,
        selectedTamanho: pizza.selectedTamanho,
      })
    );
  }

  return id ? (
    <ButtonBase onClick={handleClick}>
      <section className="order-recommendation-container">
        <div className="top">
          <h2>PIZZA DO DIA</h2>
          <h3>{text || `Compre a pizza do dia e ganhe ${points} pontos!`}</h3>
        </div>

        <div className="content">
          <div className="item">
            Pizza sabor{pizza.recheio.length > 1 && "es"}{" "}
            {pizza.recheio.map((recheio, index) => {
              if (index === 0) {
                return recheio.name;
              } else {
                return ` e ${recheio.name}`;
              }
            })}
          </div>

          <div className="item">Tamanho {pizza.selectedTamanho}</div>

          <div className="item">Massa {pizza.massa.name}</div>

          <div className="item">
            Por apenas: <span className="price">{formatCurrency(price)}</span>
          </div>

          <div className="item" style={{ fontWeight: 500 }}>
            Ganhe {points} pontos
          </div>
        </div>
      </section>
    </ButtonBase>
  ) : (
    <></>
  );
};

export default OrderRecommendation;
