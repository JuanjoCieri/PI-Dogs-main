import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../redux/actions";

export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogByName(name));
  };

  return (
    <div className="flex w-96">
      <div className="w-2/3">
        <input
          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
          type="Text"
          value={name}
          placeholder="Search..."
          onChange={(e) => handleInput(e)}
        />
      </div>
      <div className="w-1/3">
        <button
          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
          onClick={(e) => handleClick(e)}
        >
          Search
        </button>
      </div>
    </div>
  );
}
