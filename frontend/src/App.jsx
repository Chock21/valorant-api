import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'
import UserLogin from './pages/UserLogin'
import UserLists from './pages/UserLists'
import UserDetails from './pages/UserDetail'
import UserCreate from './pages/UserCreate'
import Agents from './pages/Agents'
import AgentDetail from './pages/AgentDetail'
import AgentCreate from './pages/AgentCreate'
import Ranks from './pages/Ranks'
import RankDetail from './pages/RankDetail'
import RankCreate from './pages/RankCreate'
import NotFound from './pages/NotFound'
import './App.css'


function App() {
  const { user, logout } = useContext(AuthContext); 

  return (
    <>
      <nav className="d-flex justify-content-between align-items-center border-bottom border-light p-3">
        <a href="/" className="d-flex flex-row ms-5">
          <div>
            <img src="/imgs/valorant-api.png" alt="logo" width="190px"/>
          </div>
          <div className="logo-line ps-1">
              <p className="m-0">API</p>
              <p className="m-0">RESTFUL</p>
          </div>
        </a>
        <ul className="m-0 d-flex flex-row list-unstyled me-5">
          <li className="mx-3 d-flex align-items-center">
            <Link to="/">Agents</Link>
          </li>
          <li className="mx-3 d-flex align-items-center">
            <Link to="/ranks">Rank</Link>
          </li>
          <li className="mx-3 d-flex align-items-center">
            <Link to="/users">Users</Link>
          </li>
          <li className="mx-3 d-flex align-items-center">
            {
              user ? (
                <a className="btn btn-danger" onClick={logout} style={{ color: 'inherit', textDecoration: 'none' }}>
                  Logout
                </a>
              ) : (
                <span>
                  <Link className="btn btn-danger me-3" to="/register">Register</Link>
                  <Link className="btn btn-primary" to="/login">Login</Link>
                </span>
              )
            }
          </li>
        </ul>
      </nav>
      <main className="container py-4">
          <Routes>
            <Route path="/" element={<Agents />} />
            <Route path="/ranks" element={<Ranks />} />
            <Route path="/ranks/:id" element={<RankDetail />} />
            <Route path="/ranks/create" element={<RankCreate />} />
            <Route path="/users" element={<UserLists />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/agents/:id" element={<AgentDetail />} />
            <Route path="/agents/create" element={<AgentCreate />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserCreate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </main>
      <footer className="border-top border-light d-flex flex-column align-items-center justify-content-center p-3">
        <p className="m-0">Martín Oscar Mateo | Aplicaciones Híbridas | Jonathan Emanuel Cruz | DWT4AV</p>
      </footer>
    </>
  )
}

export default App
