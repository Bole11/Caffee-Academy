import { useState, useEffect, useRef } from "react";   
import { Link, useNavigate } from "react-router-dom";

import "../styles/Prijava.css";

import logo from "../Images/logo.png";
import leftArrow from "../Images/left-arrow.png";
import showPass from "../Images/pass-show.png";
import hidePass from "../Images/pass-hide.png";


export function Prijava () {
    const navigate = useNavigate();
    const [inputType, setInputType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(showPass);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const passwordInputRef = useRef(null);

    function handleGoBack() {
        navigate('/');
    };

    function handlePrijaviSe() {
        if (email === "user@quantox.academy" && password === "user") {
            navigate('/profil');
        } else if (email === "admin@caffee.academy" && password === "admin") {
            navigate('/admin');
        } else {
            alert("Pogrešan email ili lozinka!");
        };
    };

    function togglePasswordVisibility(event) {
        event.preventDefault();
        setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
        setPasswordIcon((prev) => (prev === showPass ? hidePass : showPass));
    
        if (passwordInputRef.current) {
            passwordInputRef.current.focus();
        };
    };
    
    function handleFocus() {
        setIsPasswordFocused(true);
    };
    
    function handleBlur() {
        setIsPasswordFocused(false);
    };

    function handleInputChange(event) {
        const { id, value } = event.target;
        
        if (id === 'email') {
            setEmail(value);
        } else if (id === 'lozinka') {
            setPassword(value);
        }
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
                                    <input 
                                    type="email" 
                                    id="email" 
                                    placeholder="Unesite email adresu" 
                                    autoComplete="off"
                                    onChange={handleInputChange} />
                                </label>
                            </div>
                            <div className="prijava-form-group">Lozinka
                                <label htmlFor="lozinka">
                                    <input 
                                    type={inputType} 
                                    id="lozinka"
                                    placeholder="Unesite lozinku" 
                                    autoComplete="off"
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    ref={passwordInputRef}
                                    onChange={handleInputChange}/>
                                    {isPasswordFocused && (
                                    <img
                                        src={passwordIcon}
                                        alt="Toggle Password Visibility"
                                        onMouseDown={togglePasswordVisibility}
                                        className="password-toggle-icon-prijava"
                                    />
                                    )}
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
