import '../App.css'
import historyIcon from '../assets/history.svg'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <div className='flex justify-between items-center mx-5 mt-3'>
            <img src={historyIcon} onClick={props.fungsi} alt="Logo" className='w-[30px] md:w-[40px] cursor-pointer'/>
            <button onClick={() => {confirm("Yakin logout?") ? handleLogout() : false}} className='btn text-white btn-sm btn-error md:text-xl'>Logout</button>
        </div>
    )
}

export default Navbar;