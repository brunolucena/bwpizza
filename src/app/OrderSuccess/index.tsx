import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";

import { ButtonBase } from "@material-ui/core";

import { BWPizzaStore } from "../Store";
import { clearOrderPizza } from "../Store/Ducks/orderPizzaDuck";
import { Link } from "react-router-dom";

interface Props {}

const OrderSuccess: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { orderPizza } = useSelector((state: BWPizzaStore) => state);

  const { orderPizzaResponse } = orderPizza;

  const { estimatedArrivalText, pointsEarned, viewId } = orderPizzaResponse;

  useEffect(() => {
    dispatch(clearOrderPizza());
  }, [dispatch]);

  return (
    <section className="order-success-container">
      <div className="order-success">
        {pointsEarned && (
          <div className="points">
            <h1>Parabéns! Você ganhou {pointsEarned} pontos!</h1>
          </div>
        )}

        <div className="content">
          <h1>Pedido realizado com sucesso!</h1>
          <h2>Anote o número do seu pedido: #{viewId}</h2>
          <p>{estimatedArrivalText}</p>

          <Link to="/" style={{ textDecoration: "none" }}>
            <ButtonBase
              className="button-avancar"
              style={{ width: "initial", marginTop: 30 }}
            >
              <div>VOLTAR</div>
            </ButtonBase>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
