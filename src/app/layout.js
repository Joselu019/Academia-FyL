'use client';

import Link from 'next/link';
import Head from 'next/head';
import './globals.css';
import { IoCalendarNumber } from "react-icons/io5";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { FaSchoolFlag } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useActiveRoute } from '../hooks/useActiveRoute';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/context/AuthContext';
import ProtectedLayout from '@/components/auth/ProtectedLayout';
import { FaUserClock, FaUserGraduate } from "react-icons/fa";

const Navigation = () => {
  const { isActive } = useActiveRoute();
  const { user, logout } = useAuth();

  // Si no hay usuario autenticado, no mostrar la navegación
  if (!user || !user.role) return null;
  
  // Si es padre, no mostrar esta navegación (usará su propio layout)
  if (user.role === 'parent' || user.role === 'contact') return null;

  const handleLogout = () => {
    logout();
  };
  
  const isTeacher = user.role === 'teacher';

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1 className="nav-title">Academia FyL</h1>
        <div className="text-sm text-gray-400 mt-1">
          {user?.name || 'Usuario'} ({isTeacher ? 'Profesor' : 'Admin'})
        </div>
      </div>
      <ul className="nav-links">
        {isTeacher ? (
          // --- Menú Profesor ---
          <>
            <li>
              <Link href="/teacher/schedule" className={`nav-item ${isActive('/teacher/schedule') ? 'active' : ''}`}>
                <FaUserClock className="nav-icon" />
                <span>Mis clases</span>
              </Link>
            </li>
            <li>
              <Link href="/teacher/students" className={`nav-item ${isActive('/teacher/students') ? 'active' : ''}`}>
                <FaUserGraduate className="nav-icon" />
                <span>Mis Alumnos</span>
              </Link>
            </li>
          </>
        ) : (
          // --- Menú Admin/General ---
          <>
            <li>
              <Link href="/admin/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                <MdDashboard className="nav-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/academias" className={`nav-item ${isActive('/academias') ? 'active' : ''}`}>
                <FaSchoolFlag className="nav-icon" />
                <span>Academias</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/alumnos" className={`nav-item ${isActive('/alumnos') ? 'active' : ''}`}>
                <PiStudentFill className="nav-icon" />
                <span>Alumnos</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/profesores" className={`nav-item ${isActive('/profesores') ? 'active' : ''}`}>
                <GiTeacher className="nav-icon" />
                <span>Profesores</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/mensajes" className={`nav-item ${isActive('/mensajes') ? 'active' : ''}`}>
                <MdMessage className="nav-icon" />
                <span>Mensajes</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/horarios" className={`nav-item ${isActive('/horarios') ? 'active' : ''}`}>
                <IoCalendarNumber className="nav-icon" />
                <span>Horarios</span>
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="nav-footer">
        <div className="flex flex-col space-y-2">
          <Link href="/admin/configuracion" className={`nav-item ${isActive('/configuracion') ? 'active' : ''}`}>
            <IoMdSettings className="nav-icon" />
            <span>Configuración</span>
          </Link>
          <button onClick={handleLogout} className="nav-item text-red-500 hover:bg-red-50 w-full">
            <FiLogOut className="nav-icon" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <div className="layout">
            <Navigation />
            <main>
              <ProtectedLayout>{children}</ProtectedLayout>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
