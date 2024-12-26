import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex bg-white p-4 container mx-auto rounded-lg items-center justify-between px-10">
      <Link
        className="bg-gray-500 p-2 rounded-md text-white text-lg font-mono font-semibold"
        to="/"
      >
        ToDo
      </Link>
      <Link
        className="bg-gray-500 p-2 rounded-md text-white text-lg font-mono font-semibold"
        to="/copy"
      >
        Copy text
      </Link>
      <Link
        className="bg-gray-500 p-2 rounded-md text-white text-lg font-mono font-semibold"
        to="/editor"
      >
        Editor
      </Link>
    </div>
  );
}

export default Header;
