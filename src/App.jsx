import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreList from "./pages/reduxToolkit/StoreList";
import StoreLayout from "./pages/reduxToolkit/StoreLayout";
import CreateStore from "./pages/reduxToolkit/CreateStore";
import EditStore from "./pages/reduxToolkit/EditStore";
import Layout from "./pages/Layout";
import StoreLayoutTanstack from "./pages/tanstackQuery/StoreLayoutTanstack";
import StoreListTanstack from "./pages/tanstackQuery/StoreListTanstack";
import EditStoreTanstack from "./pages/tanstackQuery/EditStoreTanstack";
import CreateStoreTanstack from "./pages/tanstackQuery/CreateStoreTanstack";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}></Route>
      </Routes>

      <Routes>
        <Route path="redux" element={<StoreLayout />}>
          <Route path="stores" element={<StoreList />} />
          <Route path="store-detail">
            <Route path=":storeId" element={<EditStore />}></Route>
          </Route>
          <Route path="store-create" element={<CreateStore />}></Route>
        </Route>
      </Routes>

      <Routes>
        <Route path="tanstack" element={<StoreLayoutTanstack />}>
          <Route path="stores" element={<StoreListTanstack />} />
          <Route path="store-detail">
            <Route path=":storeId" element={<EditStoreTanstack />}></Route>
          </Route>
          <Route path="store-create" element={<CreateStoreTanstack />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
