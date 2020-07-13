import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import "./styles.scss";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";

import { BWPizzaStore } from "../../Store";

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: "inline-block",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

/**
 * Retorna um array com o nome de cada step.
 */
function getSteps(): string[] {
  return ["Sabor", "Tamanho", "Massa"];
}

const OrderStepper: React.FC<Props> = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const steps = getSteps();

  const { orderPizza } = useSelector((state: BWPizzaStore) => state);

  const { pizza, selectedMassa, selectedTamanho } = orderPizza;

  /**
   * Retorna o activeStep de acordo com a rota.
   */
  function getActiveStep(): number {
    const { pathname } = location;

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
   * Navega para a rota de acordo com o step clickado.
   */
  const handleStep = (step: number) => {
    if (step === 0) {
      history.push("/");
    } else if (step === 1) {
      history.push("/escolher-tamanho");
    } else if (step === 2) {
      history.push("/escolher-massa");
    }
  };

  /**
   * Verifica se um determinado passo foi completado.
   */
  function isCompleted(index: number): boolean {
    /**
     * Retorna true se o pelo menos um recheio já foi selecionado.
     */
    function isRecheioCompleted(): boolean {
      return pizza.recheio.length > 0;
    }

    /**
     * Retorna true se o tamanho já foi selecionado.
     */
    function isTamanhoCompleted(): boolean {
      return !!selectedTamanho;
    }

    /**
     * Retorna true se a massa já foi selecionada.
     */
    function isMassaCompleted(): boolean {
      return !!selectedMassa;
    }

    // Passo 1 - Recheio
    if (index === 0) {
      return isRecheioCompleted();
    } else if (index === 1) {
      // Passo 2 - Tamanho
      return isTamanhoCompleted();
    } else if (index === 2) {
      // Passo 3 - Massa
      return isMassaCompleted();
    }

    return false;
  }

  return (
    <section className={`order-stepper-container ${classes.root}`}>
      <Stepper nonLinear activeStep={getActiveStep()}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              completed={isCompleted(index)}
              onClick={() => handleStep(index)}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </section>
  );
};

export default OrderStepper;
