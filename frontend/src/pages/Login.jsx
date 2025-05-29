import '../App.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 md:w-[500px] py-[40px]'>
        <p className='font-bold text-base mb-5 md:text-3xl md:mb-10'>Login</p>
        <label className="label md:text-xl" htmlFor="username">Username</label><br />
        <input id="username" type="text" className="input md:w-[460px]" placeholder="Username" required/><br />
        <label className="label md:text-xl" htmlFor="password">Password</label><br />
        <input id="password" type="password" className="input md:w-[460px]" placeholder="Password" required/><br />
        <div className="opsi flex justify-between items-center">
          <p className='md:text-base'>Belum punya akun? <Link to="/registrasi" className="text-blue-500">Registrasi</Link></p>
          <input type="submit" value="Login" className="btn btn-primary md:text-xl"/>
        </div>
      </form>
    </div>
  )
}

export default Login;
