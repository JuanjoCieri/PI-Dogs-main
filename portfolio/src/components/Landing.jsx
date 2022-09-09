import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="w-full h-screen lg:flex lg:flex-row flex flex-col justify-around items-center">
      <div>
        <h1 className="text-yellow-900 text-6xl font-semibold">Welcome to the <br/> Dogs SPA</h1>
      </div>
      <div>
        <h2 className="text-yellow-900 text-3xl font-semibold italic">Enter and see <br/> all about dogs...</h2>
      </div>
      <Link to="/home">
        <button className="py-2 px-4  bg-amber-600 hover:bg-amber-400 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">ENTER NOW</button>
      </Link>
    </div>
  );
}
