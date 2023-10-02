import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import AppRouter from "./AppRouter";
import store from "./Redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
