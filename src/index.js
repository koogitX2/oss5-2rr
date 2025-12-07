import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import List from "./components/Pages/List";
import Create from "./components/Pages/Create";
import Detail from "./components/Pages/Detail";
import Update from "./components/Pages/Update";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/list" element={<List />} />
      <Route path="/create" element={<Create />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/update/:id" element={<Update />} />
    </Routes>
  </BrowserRouter>
);
