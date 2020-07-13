import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "./styles.scss";

import FormGroup from "@material-ui/core/FormGroup";
import { FormControlLabel, Checkbox } from "@material-ui/core";

import { BWPizzaStore } from "../../Store";
import { Recheio } from "../../Store/Models/PizzaModels";
import { formatCurrency } from "../../Core/Helpers/formatters";
import {
  selectIsRecheioActive,
  setOrderPizzaData,
  toggleRecheio,
} from "../../Store/Ducks/orderPizzaDuck";

interface Props {}

const EscolherRecheio: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { orderPizza, pizzas } = useSelector((state: BWPizzaStore) => state);

  const { doisRecheios, pizza } = orderPizza;
  const { availablePizzas } = pizzas;

  /**
   * Alterna o state do recheio.
   */
  function handleChange(recheio: Recheio) {
    dispatch(toggleRecheio(recheio));
  }

  function handleChangeDoisRecheios() {
    const toState = !doisRecheios;

    // Ao desativar a opção de dois recheios, se tiver dois recheios
    // selecionados, deseleciona o último.
    if (!toState && pizza.recheios.length === 2) {
      dispatch(toggleRecheio(pizza.recheios[pizza.recheios.length - 1]));
    }

    // Alterna o state do doisRecheios.
    dispatch(
      setOrderPizzaData({
        doisRecheios: toState,
      })
    );
  }

  /**
   * Verifica se o checkbox do recheio em questão deve estar desativado.
   * Um checkbox estará desativado se o limite de recheios já foi atingido.
   */
  function isDisabled(recheioId: string): boolean {
    const isSelected = selectIsRecheioActive(orderPizza, recheioId);

    // Se o recheio já está selecionado, não deve ficar disabled
    // pois é preciso poder deselecioná-lo.
    if (isSelected) {
      return false;
    }

    // Se tiver marcado a opção de recheios, desativa se tiver selecionado
    // os dois recheios.
    if (doisRecheios) {
      return pizza.recheios.length === 2;
    }

    // Se não se já tiver selecionado um recheio.
    return pizza.recheios.length === 1;
  }

  return (
    <section className="escolher-recheio-container">
      <div className="top">
        <FormControlLabel
          control={
            <Checkbox
              checked={doisRecheios}
              onChange={handleChangeDoisRecheios}
              name="dois-recheios"
            />
          }
          label="2 Sabores (será cobrado o maior valor)"
        />
      </div>

      <FormGroup className="escolher-recheio-form-group">
        {availablePizzas.recheios.map((recheio, index) => {
          const { id, name, tamanhos } = recheio;

          // Transforma o array de objetos do tipo Tamanho para um
          // array somente com os preços.
          const tamanhosPrices = tamanhos.map((tamanho) => tamanho.price);

          // Pega o menor preço.
          const lowestPrice =
            tamanhosPrices.length > 0
              ? tamanhosPrices.reduce((previousValue, currentValue) => {
                  if (currentValue < previousValue) {
                    return currentValue;
                  }

                  return previousValue;
                })
              : 0;

          // Pega o maior preço.
          const highestPrice = tamanhosPrices.reduce(
            (previousValue, currentValue) => {
              if (currentValue < previousValue) {
                return previousValue;
              }

              return currentValue;
            },
            0
          );

          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectIsRecheioActive(orderPizza, id)}
                  onChange={() => handleChange(recheio)}
                  name={name}
                />
              }
              disabled={isDisabled(id)}
              key={`${name} ${id} ${index}`}
              label={`${name}. Entre ${formatCurrency(
                lowestPrice
              )} e ${formatCurrency(highestPrice)}`}
            />
          );
        })}
      </FormGroup>
    </section>
  );
};

export default EscolherRecheio;
