import '../App.css'
import Navbar from "../components/Navbar"
import { useState } from "react"
import swapIcon from '../assets/swap.svg'

const Home = () => {
    let [mode, setMode] = useState("Angka ke Romawi");

    const togleMode = () => {
        mode === "Angka ke Romawi" ? setMode("Romawi ke Angka") : setMode("Angka ke Romawi")
    }

    return (
        <div data-theme="drak">
            <Navbar />
            <div className="w-[300px] mx-auto mt-[130px] fieldset bg-base-200 border-base-300 rounded-box border p-4 md:w-[600px]">
                <label htmlFor="inputanUser" className='label mx-auto text-xl mb-3 text-white md:text-2xl' >{mode}</label>
                <input type={mode === "Angka ke Romawi" ? "number" : "text"} id="inputanUser" className='input w-full' placeholder={`Masukkan ${mode === "Angka ke Romawi" ? "Angka" : "Romawi"}`} required/>
                <div className="flex justify-between items-center mt-5 px-3">
                    <input type="submit" value="Ubah" className='btn btn-sm btn-primary md:text-xl'/>
                    <img src={swapIcon} alt="Swap" onClick={togleMode} className='md:w-[30px]'/>
                </div>
            </div>
            <div className="w-[300px] mx-auto mt-[20px] fieldset bg-base-200 border-base-300 rounded-box border p-4 text-center md:w-[600px] md:text-2xl" >
                VIII
            </div>
        </div>
    )
}

export default Home;