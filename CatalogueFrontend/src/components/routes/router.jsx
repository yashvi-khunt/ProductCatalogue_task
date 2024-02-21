import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthLayout, Login } from "../index";
import { AddProduct, Admin, Product, Tag, AddTag } from "../admin/index";
import App from "../../App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/admin"
        element={
          <AuthLayout authentication>
            <Admin />
          </AuthLayout>
        }
      >
        <Route path="product" element={<Product />}></Route>
        <Route path="/admin/product/add" element={<AddProduct />} />
        <Route path="/admin/product/edit/:id" element={<AddProduct />} />
        <Route path="tag" element={<Tag />}></Route>
        <Route path="/admin/tag/add" element={<AddTag />} />
        <Route path="/admin/tag/edit/:id" element={<AddTag />} />
      </Route>
    </Route>
  )
);

export default router;
