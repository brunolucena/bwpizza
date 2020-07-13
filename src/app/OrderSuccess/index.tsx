import React, { useEffect } from "react";

import "./styles.scss";

import { useDispatch } from "react-redux";
import { clearOrderPizza } from "../Store/Ducks/orderPizzaDuck";

interface Props {}

const OrderSuccess: React.FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearOrderPizza());
  }, [dispatch]);
  return <section className="order-success-container">OrderSuccess</section>;
};

export default OrderSuccess;
