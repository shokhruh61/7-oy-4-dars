import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Edit from "./components/Edit";
import Drag from "./components/Drag";
import ItemsCopy from "./components/Copy";
function App() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Header />
        <Routes>
          <Route path="/" element={<Drag />} />
          <Route path="/copy" element={<ItemsCopy />} />
          <Route path="/editor" element={<Edit />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
