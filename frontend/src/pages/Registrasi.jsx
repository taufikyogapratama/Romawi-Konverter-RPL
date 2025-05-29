import '../App.css';
import { Link } from 'react-router-dom';

const Registrasi = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <form className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 md:w-[500px] py-[40px]'>
                <p className='font-bold text-base mb-5 md:text-3xl md:mb-10'>Registrasi</p>
                <label className="label md:text-xl" htmlFor="username">Username</label><br />
                <input id="username" type="text" className="input md:w-[460px]" placeholder="Username" required/><br />
                <label className="label md:text-xl" htmlFor="password">Password</label><br />
                <input id="password" type="password" className="input md:w-[460px]" placeholder="Password" required/><br />
                <label className="label md:text-xl" htmlFor="password">Confirm Password</label><br />
                <input id="password" type="password" className="input md:w-[460px]" placeholder="Password" required/><br />
                <div className="opsi flex justify-between items-center">
                <p className='md:text-base'>Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link></p>
                <input type="submit" value="Registrasi" className="btn btn-primary md:text-xl"/>
                </div>
            </form>
        </div>
    )
}

export default Registrasi;