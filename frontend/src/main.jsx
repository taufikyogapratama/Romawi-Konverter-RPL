import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login'
import Registrasi from './pages/Registrasi'
import Home from './pages/Home'

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/registrasi", element: <Registrasi /> },
  { path: "/", element: <Home />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
