import { useState, useEffect } from "react";   
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import leftArrow from "../Images/left-arrow.png";
import "../styles/Prijava.css";


export function Prijava () {
    const navigate = useNavigate();

    function handleGoBack() {
        navigate('/');
    };

    function handlePrijaviSe() {
        navigate('/profil');
    };

    return (
        <section className="prijava-main-section">
                    <nav className="prijava-nav">
                        <img src={leftArrow} alt="go back" onClick={handleGoBack}/>
                    </nav>
                    <main className="prijava-main-container">
                        <div className="register-title">
                            <img src={logo} alt="Cafe Aacademy Logo"/>
                            <h2>Prijavi se</h2>
                        </div>
                        <div className="prijava-div-form">
                            <div className="prijava-form-group">Email
                                <label htmlFor="email">
                                    <input type="email" id="email" placeholder="Unesite email adresu" autoComplete="on" />
                                </label>
                            </div>
                            <div className="prijava-form-group">Lozinka
                                <label htmlFor="lozinka">
                                    <input type="password" id="lozinka" placeholder="Unesite lozinku" autoComplete="on"/>
                                </label>
                            </div>
                        </div>
                        <div className="prijava-zaboravljena-lozinka">
                            <Link to="/zaboravljenaLozinka">Zaboravili ste lozinku?</Link>
                        </div>
                        <div className="prijava-div-submit">
                            <button onClick={handlePrijaviSe}>Prijavi se</button>
                            <span>Još uvek nemate kreiran nalog? <Link to="/registracija">Registruj se</Link></span>
                        </div>
                    </main>
                </section>
    )
}
