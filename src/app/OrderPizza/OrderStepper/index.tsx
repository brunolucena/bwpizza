import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import "./styles.scss";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Stepper from "@material-ui/core/Stepper";

import { BWPizzaStore } from "../../Store";
import {
  selectIsStepValid,
  selectActiveStepByPathname,
} from "../../Store/Ducks/orderPizzaDuck";

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

  /**
   * Retorna o activeStep de acordo com a rota.
   */
  function getActiveStep(): number {
    const currentStep = selectActiveStepByPathname(location.pathname);

    return currentStep;
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
    // Passo 1 - Recheio
    if (index === 0) {
      return selectIsStepValid(orderPizza, 0);
    }

    // Passo 2 - Tamanho
    if (index === 1) {
      return selectIsStepValid(orderPizza, 1);
    }

    // Passo 3 - Massa
    if (index === 2) {
      return selectIsStepValid(orderPizza, 2);
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
