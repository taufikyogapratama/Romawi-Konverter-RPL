import '../App.css'
import historyIcon from '../assets/history.svg'

const Navbar = (props) => {
    return (
        <div className='flex justify-between items-center mx-5 mt-3'>
            <img src={historyIcon} onClick={props.fungsi} alt="Logo" className='w-[30px] md:w-[40px] cursor-pointer'/>
            <button className='btn btn-sm btn-error md:text-xl'>Logout</button>
        </div>
    )
}

export default Navbar;