import React, { useState } from "react";

function ItemsCopy() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [namePaste, setNamePaste] = useState("");

  const handleSave = (event) => {
    event.preventDefault();

    if (name.trim() === "") {
      alert("malumot kiriting");
      return;
    }

    setItems((perviusName) => [...perviusName, name]);
    setName("");
  };

  const handleCopy = (item) => {
    sum.copy.writeText(item);
  };

  const handlePaste = (event) => {
    event.preventDefault();

    sum.copy
      .readText()
      .then((text) => {
        setNamePaste(text);
      })
      .catch(() => {});
  };

  return (
    <div className="container mx-auto mt-10 p-5 max-w-md bg-blue-200 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold mb-5">
        biror soz kiriting
      </h1>

      <form onSubmit={handleSave} className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="copy qilmoqchi bolgan narsangiz nomi "
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          qoshish
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => handleCopy(item)}
            className="px-4 py-2 bg-white rounded-md shadow hover:bg-gray-100 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">malumot joylashtirish</h2>
        <input
          type="text"
          placeholder="Ctrl+v"
          value={namePaste}
          onPaste={handlePaste}
          onChange={(e) => setNamePaste(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
    </div>
  );
}

export default ItemsCopy;
