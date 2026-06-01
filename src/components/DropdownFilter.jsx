import { useState } from "react";

export default function DropdownFilter({ onClickAction }) {
  const [open, setOpen] = useState(false);

  function handleClick(type) {
    onClickAction(type);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-[rgb(31,41,55)] hover:bg-[rgb(17,24,39)] text-white px-4 py-3 rounded-lg"
      >
        Urutkan
      </button>

      {open && (
        <div className="absolute mt-2 w-48 bg-[rgb(31,41,55)] text-white shadow-lg rounded-lg z-50">
          <button
            onClick={() => handleClick("harga-murah")}
            className="block w-full text-left px-4 py-2 hover:bg-[rgb(17,24,39)]"
          >
            Harga Termurah
          </button>

          <button
            onClick={() => handleClick("harga-mahal")}
            className="block w-full text-left px-4 py-2 hover:bg-[rgb(17,24,39)]"
          >
            Harga Termahal
          </button>

          <button
            onClick={() => handleClick("alfabet-naik")}
            className="block w-full text-left px-4 py-2 hover:bg-[rgb(17,24,39)]"
          >
            Alfabet Menaik
          </button>

          <button
            onClick={() => handleClick("alfabet-turun")}
            className="block w-full text-left px-4 py-2 hover:bg-[rgb(17,24,39)]"
          >
            Alfabet Menurun
          </button>
        </div>
      )}
    </div>
  );
}