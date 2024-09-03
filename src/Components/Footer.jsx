import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
// import "./movies.css"

function Footer() {
  return (
     <>
     <footer>
     <div>
     <ul>
        <li><Link to="">Terms of Use</Link></li>
        <li><Link to="">Privacy Policy</Link></li>
        <li><Link to="">About</Link></li>
        <li><Link to="">Blog</Link></li>
        <li><Link to="">FAQ's</Link></li>
     </ul>
     </div>
    
    <div>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi unde tempora excepturi corporis, et ratione recusandae vitae cumque odio voluptates iure consequuntur debitis commodi, quibusdam qui ab, explicabo sint accusamus.</p>

    </div>

    <div>
        <ul>
           <li><Link to=""><FaLinkedin/></Link></li>
           <li><Link to=""><FaFacebook /></Link></li>
           <li><Link to=""><FaXTwitter /></Link></li>
           <li><Link to=""><FaInstagram /></Link></li>
        </ul>

    </div>

     </footer>
    
   
     </>
  )
}

export default Footer