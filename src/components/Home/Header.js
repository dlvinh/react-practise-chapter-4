import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css";
export default function Header() {
    const activeClassName = "activeNavTab"
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink className= {({ isActive }) =>
                                isActive ?  "nav-link " +activeClassName : "nav-link"
                            } to="/home">Home<span className="sr-only"></span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className= {({ isActive }) =>
                                isActive ?  "nav-link " +activeClassName : "nav-link"
                            } to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className= {({ isActive }) =>
                                isActive ?  "nav-link " +activeClassName : "nav-link"
                            } to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className= {({ isActive }) =>
                                isActive ?  "nav-link " +activeClassName : "nav-link"
                            } to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className= {({ isActive }) =>
                                isActive ?  "nav-link " +activeClassName : "nav-link"
                            } to="/todolist">Todolist</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className= {({ isActive }) =>
                                isActive ?  "nav-link " +activeClassName : "nav-link"
                            } to="/todolistrfc">TodolistRFC</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className= {({ isActive }) =>
                                isActive ?  "nav-link " +activeClassName : "nav-link"
                            } to="/todolistredux">TodolistRedux</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className= {({ isActive }) =>
                                isActive ?  "nav-link " +activeClassName : "nav-link"
                            } to="/todolistSaga">todolistSaga</NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        </div>
    )
}
