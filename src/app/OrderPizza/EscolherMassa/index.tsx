import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles.scss";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import { formatCurrency } from "../../Core/Helpers/formatters";

import { BWPizzaStore } from "../../Store";
import { setMassa } from "../../Store/Ducks/orderPizzaDuck";

interface Props {}

const EscolherMassa: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { orderPizza, pizzas } = useSelector((state: BWPizzaStore) => state);

  const { selectedMassa, selectedTamanho } = orderPizza;
  const { availablePizzas } = pizzas;

  const { massas } = availablePizzas;

  /**
   * Coloca na redux a massa selecionada.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const massa = massas.find((m) => m.id === value);

    if (massa) {
      dispatch(setMassa(massa));
    }
  };

  return (
    <section className="escolher-massa-container">
      {!selectedTamanho ? (
        <div className="error-message">
          <Link to="/escolher-tamanho">Selecione um tamanho</Link>
        </div>
      ) : (
        <FormControl component="fieldset">
          <FormLabel component="legend">Massa</FormLabel>

          <RadioGroup
            aria-label="Massa"
            name="selectedMassa"
            value={selectedMassa?.id}
            onChange={handleChange}
          >
            {massas.map((massa, index) => {
              const { additionalPrice, id, name } = massa;

              return (
                <FormControlLabel
                  control={<Radio />}
                  key={`${name} ${index}`}
                  label={`${name}${
                    additionalPrice
                      ? " (+" + formatCurrency(additionalPrice) + ")"
                      : ""
                  }`}
                  value={id}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      )}
    </section>
  );
};

export default EscolherMassa;
