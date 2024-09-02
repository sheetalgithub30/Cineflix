import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <header>
        <Link to='/'>
          <h1>MovieHub</h1>
        </Link>
        <ul>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/tvshows">TV'S</Link></li>
        </ul>
      </header>
    </div>
  )
}

export default Header