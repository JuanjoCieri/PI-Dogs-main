import React from "react";
import { useState } from "react";
import { getAllTemperaments, createDog } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "./Navbar";
import styles from "./Form.module.css";

export default function Form() {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.allTemperaments);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function validate(input) {
    let errors = {};
    var regex = new RegExp("^[0-9]+$");

    if (input.name) {
      if (!/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/.test(input.name)) {
        errors.name = "Name cannot contain numbers o special characters";
      } else if (input.name.length > 20) {
        errors.name = "Name cannot have more than 20 characters!";
      } else errors.name = "";
    } else errors.name = "Name is required!";

    if (input.weightMin && input.weightMax) {
      if (input.weightMin <= 0 || input.weightMax <= 0) {
        errors.weight = "Weight cannot be negative";
      } else if (parseInt(input.weightMin) > parseInt(input.weightMax)) {
        errors.weight = "Minimun weight cannot be greater than maximun weight";
      } else if (!regex.test(input.weightMin) || !regex.test(input.weightMax)) {
        errors.weight = "Only accepts numbers!";
      } else errors.weight = "";
    } else errors.weight = "Weight is required!";

    if (input.heightMin && input.heightMax) {
      if (input.heightMin <= 0 || input.heightMax <= 0) {
        errors.height = "Height cannot be negative";
      } else if (parseInt(input.heightMin) > parseInt(input.heightMax)) {
        errors.height = "Minimun height cannot be greater than maximun height";
      } else if (!regex.test(input.heightMin) || !regex.test(input.heightMax)) {
        errors.height = "Only accepts numbers!";
      } else errors.height = "";
    } else errors.height = "Height is required!";

    if (input.life_span) {
      if (input.life_span <= 0) {
        errors.life_span = "Life span cannot be negative";
      } else if (input.life_span > 50) {
        errors.life_span = "Life span cannot be higher than 50";
      } else if (!regex.test(input.life_span)) {
        errors.life_span = "Only accepts numbers!";
      } else errors.life_span = "";
    } else errors.life_span = "Life span is required!";

    if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)) {
      errors.image = "";
    } else {
      errors.image = "Must have a valid link!";
    }

    return errors;
  }

  const handleTemp = function (e) {
    e.preventDefault();

    if (input.temperament.length === 0)
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    else {
      if (input.temperament.find((el) => el === e.target.value)) {
      } else {
        setInput({
          ...input,
          temperament: [...input.temperament, e.target.value],
        });
      }
    }
  };

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== e.target.value),
    });
  }

  let id = 0;
  function addKey() {
    return id++;
  }

  const have = () => {
    if (
      errors.name !== "" ||
      errors.height !== "" ||
      errors.image !== "" ||
      errors.life_span !== "" ||
      errors.weight !== ""
    ) {
      return false;
    } else if (
      input.name &&
      input.heightMin &&
      input.heightMax &&
      input.weightMin &&
      input.weightMax &&
      input.life_span &&
      input.image
    ) {
      return true;
    } else {
      return "e";
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (have() === true) {
      dispatch(createDog(input));
      alert("Dog created!");
      setInput({
        name: "",
        image: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        life_span: "",
        temperament: [],
      });
    } else if (have() === "e") {
      alert("Complete data required!");
    } else alert("Fill all correctly!");
  }

  return (
    <div className="w-full h-full">
      <div>
        <Navbar />
      </div>
      <form onSubmit={handleSubmit} className="w-full h-screen flex justify-center pt-10">
        <div className="w-1/2 border-4 border-yellow-800 bg-amber-700 flex flex-col items-center justify-around">
          <div>
            <label className="text-xl font-semibold">Name </label>
            <input
              name="name"
              value={input.name}
              autoComplete="off"
              onChange={handleChange}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-52 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></input>
            {errors.name && <p className={styles.danger}>{errors.name}</p>}
          </div>
          <div>
            <label className="text-xl font-semibold">Image </label>
            <input
              name="image"
              value={input.image}
              autoComplete="off"
              onChange={handleChange}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-52 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></input>
            {errors.image && <p className={styles.danger}>{errors.image}</p>}
          </div>
          <div>
            <label className="text-xl font-semibold">Weight Min </label>
            <input
              name="weightMin"
              value={input.weightMin}
              autoComplete="off"
              onChange={handleChange}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-52 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></input>
            <label className="text-xl font-semibold">Weight Max </label>
            <input
              name="weightMax"
              value={input.weightMax}
              onChange={handleChange}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-52 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></input>
            {errors.weight && <p className={styles.danger}>{errors.weight}</p>}
          </div>
          <div>
            <label className="text-xl font-semibold">Height Min </label>
            <input
              name="heightMin"
              value={input.heightMin}
              autoComplete="off"
              onChange={handleChange}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-52 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></input>
            <label className="text-xl font-semibold">Height Max </label>
            <input
              name="heightMax"
              value={input.heightMax}
              autoComplete="off"
              onChange={handleChange}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-52 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></input>
            {errors.height && <p className={styles.danger}>{errors.height}</p>}
          </div>
          <div>
            <label className="text-xl font-semibold">Life Span </label>
            <input
              name="life_span"
              value={input.life_span}
              autoComplete="off"
              onChange={handleChange}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-52 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            ></input>
            {errors.life_span && (
              <p className={styles.danger}>{errors.life_span}</p>
            )}
          </div>
          <div>
            <label className="text-xl font-semibold">Temperaments </label>
            <select onChange={handleTemp} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-52 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
              {temperaments.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.tempsss}>
            {input.temperament.map((e) => (
              <div className={styles.tempss} key={addKey()}>
                <p>{e}</p>
                <button onClick={handleDelete} value={e}>
                  X
                </button>
              </div>
            ))}
          </div>
          <div>
            <button type="submit" className="py-2 px-4  bg-amber-800 hover:bg-amber-700 focus:ring-amber-700 focus:ring-offset-amber-700 text-white w-20 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " disabled={have() === false}>
              Create!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
