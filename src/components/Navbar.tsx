import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <div id='logo-container'>
        <h1>React TS Music App</h1>
      </div>
      <div id='navigation'>
        <Link to='/'>Home</Link>
        <Link to='/play'>Play</Link>
      </div>
    </nav>
  )
}