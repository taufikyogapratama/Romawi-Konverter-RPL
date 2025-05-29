import '../App.css'
import menuIcon from '../assets/menu.svg'

const Navbar = () => {
    return (
        <div className='flex justify-between items-center mx-5 mt-3'>
            <img src={menuIcon} alt="Logo" className='w-[30px] md:w-[40px]'/>
            <button className='btn btn-sm btn-error md:text-xl'>Logout</button>
        </div>
    )
}

export default Navbar;