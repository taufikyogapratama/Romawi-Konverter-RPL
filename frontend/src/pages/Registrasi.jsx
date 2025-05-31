import '../App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Registrasi = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password dan Confirm Password tidak cocok");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/registrasi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            console.log(result);

            if (result.pesan === "berhasil daftar") {
                alert("Registrasi berhasil!");
            } else {
                alert("Registrasi gagal: " + result.pesan);
            }

        } catch (error) {
            console.error("Error saat registrasi:", error);
            alert("Terjadi kesalahan.");
        }
    };

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 md:w-[500px] py-[40px]'>
                <p className='font-bold text-base mb-5 md:text-3xl md:mb-10'>Registrasi</p>

                <label className="label md:text-xl" htmlFor="username">Username</label><br />
                <input
                    id="username"
                    type="text"
                    className="input md:w-[460px]"
                    placeholder="Username"
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
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />

                <label className="label md:text-xl" htmlFor="confirmPassword">Confirm Password</label><br />
                <input
                    id="confirmPassword"
                    type="password"
                    className="input md:w-[460px]"
                    placeholder="Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                /><br />

                <div className="opsi flex justify-between items-center">
                    <p className='md:text-base'>Sudah punya akun? <Link to="/login" className="text-blue-500">Login</Link></p>
                    <input type="submit" value="Registrasi" className="btn btn-primary md:text-xl" />
                </div>
            </form>
        </div>
    )
}

export default Registrasi;
