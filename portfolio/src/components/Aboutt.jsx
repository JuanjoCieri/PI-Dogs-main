import React from "react";
import Navbar from "./Navbar";
import foto from "../proyectimage/foto.png"

export default function Aboutt () {


    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="w-full h-96 flex justify-center items-center">
                <div className="lg:w-1/2 lg:flex">
                    <div className="w-1/2">
                    <img alt="profil" src={foto} class="mx-auto object-cover rounded-lg h-52 w-52 "/>
                    </div>
                    <div className="1/2 flex flex-col justify-center gap-3">
                        <h1 className="text-3xl font-semibold">Hola!, soy Juan José Cieri <br/> Full Stack Developer</h1>
                        <h2 className="text-xl font-semibold">Contactame en mis redes sociales!</h2>
                        <a className="text-blue-700" href="https://www.linkedin.com/in/juan-jos%C3%A9-cieri-8900a8234/">Linkedin</a>
                    </div>
                </div>
            </div>
        </div>
    )
}