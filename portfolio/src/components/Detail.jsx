import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog, clearDetails } from "../redux/actions";
import Navbar from "./Navbar";
import Loadingg from "./Loadingg";
import { useParams } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(getDog(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch]);

  const dog = useSelector((state) => state.dog);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {Object.entries(dog).length === 0 ? (
        <Loadingg />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="border-4 border-yellow-800 lg:w-1/2 lg:flex items-center p-5 py-8 gap-4 mt-16">
            <div>
              <img className="" src={dog.image} alt="" width="500px" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{dog.name}</h1>
              <h3 className="text-xl font-semibold">Temperaments: {dog.temperament}</h3>
              <h4 className="text-xl font-semibold">Height: {dog.height} Cm</h4>
              <h4 className="text-xl font-semibold">
                Weight: {dog.weight} {dog.weight_min} Kg
              </h4>
              <h4 className="text-xl font-semibold">{dog.life_span}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
