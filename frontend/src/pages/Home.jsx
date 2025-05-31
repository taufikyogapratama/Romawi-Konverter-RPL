import '../App.css'
import Navbar from "../components/Navbar"
import { useState } from "react"
import swapIcon from '../assets/swap.svg'
import closeIcon from '../assets/close.svg'

const Home = () => {
    const [mode, setMode] = useState("Angka ke Romawi");
    const [showHistory, setShowHistory] = useState(false)
    const [input, setInputValue] = useState("");
    const [outputResult, setOutputResult] = useState("");



    const togleMode = () => {
        mode === "Angka ke Romawi" ? setMode("Romawi ke Angka") : setMode("Angka ke Romawi")
    }

    const toggleHistory = () => {
        if(showHistory === true){
            setShowHistory(false)
        }else{
            setShowHistory(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // console.log("Value input:", inputValue);
        const typeInput = mode === "Angka ke Romawi" ? "angka" : "romawi";
        const userId = sessionStorage.getItem("userId");
        try {
            const response = await fetch('http://localhost:3000/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input, typeInput, userId}),
            });

            const result = await response.json();
            if (result.output) {
                setOutputResult(result.output);
            } else {
                setOutputResult(result.message);
            }
        } catch (err) {
            console.error('Gagal:', err);
        }
    }


    return (
        <div data-theme="drak">
            <Navbar fungsi={toggleHistory}/>
            <form className="w-[300px] mx-auto mt-[130px] fieldset bg-base-200 border-base-300 rounded-box border p-4 md:w-[600px]" onSubmit={handleSubmit}>
                <label htmlFor="inputanUser" className='label mx-auto text-xl mb-3 text-white md:text-2xl' >{mode}</label>
                <input type={mode === "Angka ke Romawi" ? "number" : "text"} id="inputanUser" className='input w-full' placeholder={`Masukkan ${mode === "Angka ke Romawi" ? "Angka" : "Romawi"}`} onChange={(e) => setInputValue(e.target.value)} required/>
                <div className="flex justify-between items-center mt-5 px-3">
                    <input type="submit" value="Ubah" className='btn btn-sm btn-primary md:text-xl'/>
                    <img src={swapIcon} alt="Swap" onClick={togleMode} className='md:w-[30px]'/>
                </div>
            </form>
            <div className={` ${outputResult ? "block" : "hidden"} w-[300px] mx-auto mt-[20px] fieldset bg-base-200 border-base-300 rounded-box border p-4 text-center md:w-[600px] md:text-2xl`} >
                {outputResult}
            </div>
            <div className={`historyContainer w-[200px] h-screen absolute top-0 left-0 flex flex-col justify-between fieldset bg-base-200 border-base-300 rounded-box border p-4 md:w-[400px] transition-transform duration-500 ${showHistory ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    <img src={closeIcon} onClick={toggleHistory} alt="close" className="w-[25px] md:w-[30px] absolute top-4 right-4 cursor-pointer"/>
                    <p className='text-xl font-bold mb-4 ml-2 md:text-2xl'>History</p>
                </div>
                <div className="historys overflow-y-auto px-2 flex-1" >
                    <div className="history1 mb-3 border p-2 rounded">
                        <p className="md:text-xl" >{"VII => 7"}</p>
                    </div>
                    <div className="history1 mb-3 border p-2 rounded">
                        <p className="md:text-xl" >{"VII => 7"}</p>
                    </div>
                    <div className="history1 mb-3 border p-2 rounded">
                        <p className="md:text-xl" >{"VII => 7"}</p>
                    </div>
                </div>
                <div className="p-2">
                    <button className='btn btn-error btn-sm w-full md:btn-md md:mb-5'>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default Home;