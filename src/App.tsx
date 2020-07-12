import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
// @ts-ignore
import { AnimatedSwitch } from "react-router-transition";
import { ThemeProvider } from "@material-ui/core";

import appRoutes from "./app/app.routes";

import "./assets/styles/styles.scss";

import mySaga from "app/Store/Sagas";
import store, { sagaMiddleware } from "app/Store/store";
import theme from "./app/Core/Theme";

import AppWrapper from "AppWrapper";

sagaMiddleware.run(mySaga);

const persistor = persistStore(store);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <BrowserRouter>
              <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
              >
                {appRoutes.map(({ component, exact, path }, i) => (
                  <Route
                    path={path}
                    component={component}
                    key={i}
                    exact={exact}
                  />
                ))}
              </AnimatedSwitch>
            </BrowserRouter>
          </AppWrapper>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
