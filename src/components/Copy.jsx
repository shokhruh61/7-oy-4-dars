import React, { useState } from "react";

function Copy() {
  const [text, setText] = useState("");
  function handleCopy() {
    if (text) {
      navigator.clipboard.writeText(text);
      setText("");
    }
  }
  return (
    <div className="w-[600px] container mx-auto mt-3 bg-cyan-950 rounded-xl p-6 flex flex-col gap-5 shadow-2xl">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text => copy"
          className="focus:outline-none w-[500px] p-2 pl-3 rounded-md shadow-lg"
        />
        <button
          onClick={handleCopy}
          className="bg-green-500 rounded-full w-[45px] h-[45px] text-white font-bold"
        >
          copy
        </button>
      </div>
      <h1 className="text-white font-serif font-medium">
        Tepada kiritilgan malumotni saqlandimi yoki yoqmi sinash uchun input ↓
      </h1>
      <input
        type="text"
        placeholder="Bu yerga kiriting"
        className="focus:outline-none p-2 pl-3 rounded-md shadow-lg"
      />
    </div>
  );
}

export default Copy;
