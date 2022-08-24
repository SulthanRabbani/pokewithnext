import React, { useEffect, useState } from "react";
import Select from 'react-select'
import Footer from "../components/footer";
import Link from "next/link"

export default function Home(props) {
  const [options, setOptions] = useState([])
  const [userSelect, setuserSelect] = useState("")
  const [pokeType, setpokeType] = useState("")
  const [IsShow, setIsShow] = useState(false)
  const [pokeImage, setpokeImage] = useState("")
  const [pokeHeight, setPokeHeight] = useState("")
  const [pokeWeight, setPokeWeight] = useState("")
  const getPokemon = async () => {
    const poke = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    const value = await poke.json()
    let results = value.results.map(data => {
      return {
        label: data.name,
        value: data.url
      }
    })
    setOptions(results.sort((a, b) => a.label.localeCompare(b.label)))
  }


  useEffect(() => {
    getPokemon()
  }, [])

  const handleSubmit = () => {
    setIsShow(state => !state)
  }
  const handleChange = async (event) => {
    const media = await fetch(event.value)
    const value = await media.json()
    const pokemontype = value.types[0].type.name
    const pokemon = value.sprites.other.dream_world.front_default

    setPokeHeight(value.height)
    setPokeWeight(value.weight)
    setpokeImage(pokemon)
    setuserSelect(event.label)
    setpokeType(pokemontype)
  }
  return (
    <div className="w-full h-screen">
      <div className="absolute top-0 left-0 w-full h-full"></div>
      <video src="/videoBG.mp4" autoPlay loop muted className="w-full h-full object-cover" />
      <div className="absolute top-0 flex flex-col items-center justify-center w-full h-full font-mono text-white">
        <h1 className="mb-2 text-2xl">Hello, I'm</h1>
        <h2 className="sm:text-lg text-2xl md:text-4xl lg:text-5xl animate-bounce">Sulthan Taqi Rabbani</h2>
        <h2 className="text-md mb-5 md:text-2xl lg:text-2xl">Please Choose Your Pokemon</h2>
        <div className="flex flex-row">
          {pokeImage ? <img src={pokeImage} fixed alt="" className="object-contain my-5 rounded-lg h-40 w-40px lg:h-96 lg:w-96 md:h-72 md:w-72" /> : ""}
          <div
            className={IsShow ? 'flex flex-col ml-10 capitalize justify-center text-md md:text-2xl lg:text-2xl font-extrabold' : 'flex flex-col ml-10 capitalize '}>
            <p className="">{IsShow ? `Name: ${userSelect}` : ""}</p>
            <p className="">{IsShow ? `Type: ${pokeType}` : ""}</p>
            <p className="">{IsShow ? `Height: ${pokeHeight}` : ""}</p>
            <p className="">{IsShow ? `Weight: ${pokeWeight}` : ""}</p>
          </div>
        </div>
        <Select className="text-black md:w-80 w-40 lg:w-80" options={options} onChange={(e) => handleChange(e)} />
        <button className="w-48 md:w-64 lg:w-64 mt-4 text-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mb-28" onClick={() => handleSubmit()} disabled={!userSelect}>{IsShow ? "Hide" : "Choose"}</button>
      </div>
      <Footer />
    </div>
  )
}


