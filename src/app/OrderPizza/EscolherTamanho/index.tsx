import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./styles.scss";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import { formatCurrency } from "../../Core/Helpers/formatters";

import { BWPizzaStore } from "../../Store";
import {
  selectPizzaTamanhos,
  setTamanho,
} from "../../Store/Ducks/orderPizzaDuck";

interface Props {}

const EscolherTamanho: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { orderPizza } = useSelector((state: BWPizzaStore) => state);

  const { pizza, selectedTamanho } = orderPizza;

  const tamanhos = selectPizzaTamanhos(orderPizza);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = event.target.value;

    dispatch(setTamanho(value));
  };

  return (
    <section className="escolher-tamanho-container">
      {pizza.recheios.length === 0 ? (
        <div className="error-message">
          <Link to="/">Selecione um recheio</Link>
        </div>
      ) : (
        <FormControl component="fieldset">
          <FormLabel component="legend">Tamanho</FormLabel>

          <RadioGroup
            aria-label="Tamanho"
            name="selectedTamanho"
            value={selectedTamanho}
            onChange={handleChange}
          >
            {tamanhos.map((tamanho, index) => {
              const { name, price } = tamanho;

              return (
                <FormControlLabel
                  control={<Radio />}
                  key={`${name} ${index}`}
                  label={`${name} - ${formatCurrency(price)}`}
                  value={name}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      )}
    </section>
  );
};

export default EscolherTamanho;
