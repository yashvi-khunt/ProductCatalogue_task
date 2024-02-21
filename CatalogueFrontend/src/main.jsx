import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { router } from "./components/index.js";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { AuthLayout, Login } from "./components/index.js";
import { Admin, Product, AddProduct } from "./components/admin/index.js";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
);
