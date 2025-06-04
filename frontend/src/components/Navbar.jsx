import '../App.css'
import historyIcon from '../assets/history.svg'
import { useNavigate } from 'react-router-dom'
import logoIcon from '../assets/Roman_Converter.svg'

const Navbar = (props) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <div className='flex justify-between items-center mx-5 mt-3'>
                <img src={historyIcon} onClick={props.fungsi} alt="Logo" className='w-[30px] md:w-[40px] cursor-pointer'/>
                <img src={logoIcon} alt="logo" className='w-[140px] relative md:top-[7px] md:w-[200px]'/>
                <button onClick={()=>document.getElementById('modal_logout').showModal()} className='btn text-white btn-sm btn-error md:text-xl'>Logout</button>
            </div>
            <dialog id="modal_logout" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Warning</h3>
                    <p className="py-4">Apakah anda yakin untuk logout?</p>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                        <button className="btn ml-4" onClick={() => handleLogout()}>Yes</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Navbar;
