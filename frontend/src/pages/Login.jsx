import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logoIcon from '../assets/Roman_Converter.svg'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorInput, setErrorInput] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      // console.log(result);

      if (result.pesan === 'ada') {
        sessionStorage.setItem("userId", result.user_id)
        navigate('/');
      } else {
        // alert('Username atau password salah');
        setErrorInput('Username atau password salah')
      }

    } catch (err) {
      console.error('Gagal login:', err);
    }
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <img src={logoIcon} alt="logo" className='fixed top-[30px] w-[200px] left-auto md:left-[30px]'/>
      <form onSubmit={handleLogin} className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 md:w-[500px] py-[40px]'>
        <p className='font-bold text-base mb-5 md:text-3xl md:mb-10'>Login</p>
        
        <label className="label md:text-xl" htmlFor="username">Username</label><br />
        <input
          id="username"
          type="text"
          className="input md:w-[460px]"
          placeholder="Username"
          pattern="^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z0-9.]{6,30}$"
          title="Username harus 6-30 karakter, hanya huruf kecil, angka, titik (tanpa titik di awal/akhir/berurutan)"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />

        <label className="label md:text-xl" htmlFor="password">Password</label><br />
        <input
          id="password"
          type="password"
          className="input md:w-[460px]"
          placeholder="Password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
          title="Minimal 8 karakter, harus ada huruf besar, huruf kecil, angka, dan simbol"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={`${errorInput ? "block" : "hidden"} text-red-500 mt-2.5 md:text-sm`}>{errorInput}</p>

        <div className="opsi flex justify-between items-center mt-4">
          <p className='md:text-base'>
            Belum punya akun? <Link to="/registrasi" className="text-blue-500">Registrasi</Link>
          </p>
          <input type="submit" value="Login" className="btn btn-primary md:text-xl"/>
        </div>
      </form>
    </div>
  )
}

export default Login;

