import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./components/DataProvider/DataProvider";
import { initialState, reducer } from "./utility/reducer";
import classes from "./index.module.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </React.StrictMode>
);
