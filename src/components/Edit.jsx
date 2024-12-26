import React, { useState, useContext, createContext } from "react";

const TextEditContext = createContext();

function Edit() {
  const [text, setText] = useState("");

  const [format, setFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const formatText = (type) => {
    setFormat((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Matn clipboardga nusxalandi!"))
      .catch(() => alert("Clipboardga nusxalashda xatolik yuz berdi."));
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((pasted) => setText((prev) => prev + pasted))
      .catch(() => alert("xato bor"));
  };

  return (
    <TextEditContext.Provider value={{ format, formatText }}>
      <div className="max-w-lg mx-auto mt-10 p-4 bg-blue-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-5">
          matn tahrirlagich
        </h1>

        <FormatButtons />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="matn kiriting..."
          className={`w-full h-40 p-3 border rounded-md mt-4 focus:outline-none focus:ring-2 ${
            format.bold ? "font-bold" : ""
          } ${format.italic ? "italic" : ""} ${
            format.underline ? "underline" : ""
          }`}
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Ctrl+c
          </button>
          <button
            onClick={handlePaste}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Ctrl+v
          </button>
        </div>
      </div>
    </TextEditContext.Provider>
  );
}

function FormatButtons() {
  const { format, formatText } = useContext(TextEditContext);

  return (
    <div className="flex gap-4">
      <button
        onClick={() => formatText("bold")}
        className={`px-4 py-2 rounded-md ${
          format.bold ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        qalin
      </button>
      <button
        onClick={() => formatText("italic")}
        className={`px-4 py-2 rounded-md ${
          format.italic ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        kursiv
      </button>
      <button
        onClick={() => formatText("underline")}
        className={`px-4 py-2 rounded-md ${
          format.underline ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        underline
      </button>
    </div>
  );
}

export default Edit;
