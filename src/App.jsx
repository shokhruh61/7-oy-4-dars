import React from "react";
import ToDoList from "./components/ToDoList";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Copy from "./components/Copy";
import Editor from "./components/Editor";
function App() {
  return (
    <>
     <div className="flex flex-col gap-4">
     <Header />
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/copy" element={<Copy />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
     </div>
    </>
  );
}

export default App;
