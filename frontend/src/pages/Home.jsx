import '../App.css'
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import swapIcon from '../assets/swap.svg'
import closeIcon from '../assets/close.svg'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState("Angka ke Romawi");
    const [showHistory, setShowHistory] = useState(false)
    const [input, setInputValue] = useState("");
    const [outputResult, setOutputResult] = useState("");
    const [riwayat, setRiwayat] = useState([]);
    const [clearStatus, setClearStatus] = useState()

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
            navigate("/login");
        }
    }, [navigate]);

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
    const showRiwayat = async () => {
        const userId = Number(sessionStorage.getItem("userId"));
        const responseRiwayat = await fetch('http://localhost:3000/riwayat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        })

        const resultRiwayat = await responseRiwayat.json();
        if(resultRiwayat.riwayat) {
            setRiwayat(resultRiwayat.riwayat)
        }

        console.log(riwayat)
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const typeInput = mode === "Angka ke Romawi" ? "angka" : "romawi";
        const userId = Number(sessionStorage.getItem("userId"));
        try {
            const responseKonversi = await fetch('http://localhost:3000/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input, typeInput, userId}),
            });

            const resultKonversi = await responseKonversi.json();
            if (resultKonversi.output) {
                setOutputResult(resultKonversi.output);
                showRiwayat();
            } else {
                setOutputResult(resultKonversi.message);
            }
        } catch (err) {
            console.error('Gagal:', err);
        }
    }

    const clearRiwayat = async () => {
        const userId = Number(sessionStorage.getItem("userId"));
        try{
            const responseClear = await fetch('http://localhost:3000/clear_riwayat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
            const resultResponseClear = await responseClear.json();
            if(resultResponseClear.message === "Semua riwayat berhasil dihapus"){
                setRiwayat([]);
                setClearStatus("Berhasil");
            } else {
                setClearStatus("Gagal");
            }
        } catch (err) {
            setClearStatus("Gagal");
        }
    };


    useEffect(() => {
        showRiwayat();
    }, []);

    return (
        <div data-theme="drak" className='w-full h-screen overflow-hidden'>
            <Navbar fungsi={toggleHistory}/>
            <form className="w-[300px] mx-auto mt-[130px] fieldset bg-base-200 border-base-300 rounded-box border p-4 md:w-[600px]" onSubmit={handleSubmit}>
                <label htmlFor="inputanUser" className='label mx-auto text-xl mb-3 text-white md:text-2xl' >{mode}</label>
                <input type={mode === "Angka ke Romawi" ? "number" : "text"} pattern={mode === "Angka ke Romawi" ? "[1-9][0-9]{0,2}|1000|2000|3000" : "^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$"} id="inputanUser" className='input w-full' placeholder={`Masukkan ${mode === "Angka ke Romawi" ? "Angka" : "Romawi"}`} onChange={(e) => setInputValue(e.target.value)} title={mode === "Angka ke Romawi" ? "Masukkan angka" : "Masukkan romawi"} required/>
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
                    {riwayat.map((item, index) => {
                        const tanggalJam = new Date(item.tgl).toLocaleString('sv-SE', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        }).replace(',', '');

                        return (
                            <div key={index} className="history1 mb-3 border p-2 rounded">
                                <p className="md:text-xl">{`${item.input_value} => ${item.output}`}</p>
                                <p className="text-sm text-gray-400">{tanggalJam}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="p-2">
                    <button onClick={()=>document.getElementById('modal_clear').showModal()} className='btn text-white btn-error btn-sm w-full md:btn-md md:mb-5'>Clear</button>
                </div>
            </div>
            <dialog id="modal_clear" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Warning</h3>
                    <p className="py-4">Apakah anda yakin untuk menghapus semua riwayat?</p>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                        <button className="btn ml-4" onClick={() => clearRiwayat()}>Yes</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Home;
