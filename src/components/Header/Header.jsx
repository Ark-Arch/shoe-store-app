import React from "react";
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink to='/shoes' className={({ isActive }) => isActive ? "active-class":""}>
              Shoes
            </NavLink>
          </li>
          <li>
            <NavLink to='/cart' className={({ isActive }) => isActive ? "active-class":""} >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
