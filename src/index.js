import React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { PDFViewer } from "@react-pdf/renderer";
import MyPdf from "./components/Users/Products/MyPdf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
  
      <App/>
   
    </React.StrictMode>
  </Provider>
);
