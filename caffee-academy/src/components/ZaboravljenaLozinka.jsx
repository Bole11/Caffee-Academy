import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import "../styles/ZaboravljenaLozinka.css"

import leftArrow from "../Images/left-arrow.png";
import logo from "../Images/logo.png";
import showPass from "../Images/pass-show.png";
import hidePass from "../Images/pass-hide.png";

export function ZaboravljenaLozinka() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const [inputType, setInputType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(showPass);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const passwordInputRef = useRef(null);

    const [inputTypeConfirm, setInputTypeConfirm] = useState('password');
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(showPass);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
    const confirmPasswordInputRef = useRef(null);

    function handleGoBack() {
        navigate('/prijava');
    };

    function handleNextStep() {
        setStep(prevStep => prevStep + 1);
    }

    function handleUserEmail(event) {
        const email = event.target.value;
        setEmail(email)
    }

    const calculatePasswordStrength = (password) => {
        let strength = 0;
    
        // Check for minimum length
        if (password.length >= 2) strength += 1;
    
        // Check for uppercase letters
        if (password.match(/[A-Z]/)) strength += 1;
    
        // Check for numbers
        if (password.match(/[0-9]/)) strength += 1;
    
        // Check for special characters
        if (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) strength += 1;
    
        return strength;
    };
    
    function handlePasswordStrength(event) {
        const value = event.target.value;
        setPassword(value);
        setPasswordStrength(calculatePasswordStrength(value));
    };

    function togglePasswordVisibility(event) {
        event.preventDefault();
        
        setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
        setPasswordIcon((prev) => (prev === showPass ? hidePass : showPass));
    
        if (passwordInputRef.current) {
            passwordInputRef.current.focus();
        };
    };
    
    function toggleConfirmPasswordVisibility(event) {
        event.preventDefault();
        
        setInputTypeConfirm((prev) => (prev === 'password' ? 'text' : 'password'));
        setConfirmPasswordIcon((prev) => (prev === showPass ? hidePass : showPass));
    
        if (confirmPasswordInputRef.current) {
            confirmPasswordInputRef.current.focus();
        };
    };
    
    function handleFocus(event) {
        const fieldName = event.target.id;
        
        if (fieldName === 'password') {
            setIsPasswordFocused(true);
        }

        if (fieldName === 'confirmPassword') {
            setIsConfirmPasswordFocused(true);
        }
    };
    
    function handleBlur(event) {
        const fieldName = event.target.id;

        if (fieldName === 'password') {
            setIsPasswordFocused(false);
        }

        if (fieldName === 'confirmPassword') {
            setIsConfirmPasswordFocused(false);
        }
    };

    return (
        <section className="main-section">
            <nav className="nav">
                <img src={leftArrow} alt="go back" onClick={handleGoBack}/>
            </nav>

            {step === 1 && (
                <main className="main-container">
                    <div className="main-div step1">
                        <img className="caffee-academy-logo-zab-lozinka" src={logo} alt="Cafe Aacademy Logo"/>
                        <h2>Zaboravili ste lozinku?</h2>
                        <p>Unesite svoj email da biste dobili instrukcije</p>
                        <input type="email" placeholder="Email" className="input" onChange={handleUserEmail} />
                        <button onClick={handleNextStep} className="btn">Resetuj lozinku</button>
                    </div>
                {/* Step Indicator */}
                    <div className="step-indicator">
                        {[1, 2, 3, 4].map((num) => (
                            <div
                            key={num}
                            className={`step-circle ${num <= step ? "active" : ""}`}
                            >
                            {num}
                            </div>
                        ))}
                    </div>
                </main>
            )}

            {step === 2 && (
                <main className="main-container">
                    <div className="main-div step2">
                        <img className="caffee-academy-logo-zab-lozinka" src={logo} alt="Cafe Aacademy Logo"/>
                        <h2>Resetovanje lozinke</h2>
                        <p>Poslali smo kod na <b>{email}</b></p>
                        <div className="code-input">
                            <input type="text" maxLength="1" className="code-box" />
                            <input type="text" maxLength="1" className="code-box" />
                            <input type="text" maxLength="1" className="code-box" />
                            <input type="text" maxLength="1" className="code-box" />
                        </div>
                            <button onClick={handleNextStep} className="btn">Nastavi</button>
                            <p id="p-code">Još uvek vam nije stigao kod? <span>Pošalji opet</span></p>
                    </div>
                    <div className="step-indicator">
                        {[1, 2, 3, 4].map((num) => (
                            <div
                            key={num}
                            className={`step-circle ${num <= step ? "active" : ""}`}
                            >
                            {num}
                            </div>
                        ))}
                    </div>
                </main>
            )}

            {step === 3 && (
                <main className="main-container">
                    <div className="main-div step3">
                        <img className="caffee-academy-logo-zab-lozinka" src={logo} alt="Cafe Aacademy Logo"/>
                        <h2>Resetovanje lozinke</h2>
                        <p>Lozinka mora da sadrži najmanje 8 karaktera</p>
                    <div className="input-password">
                        <label htmlFor="">Nova lozinka
                            <input 
                                id="password"
                                type={inputType} 
                                placeholder="Unesite novu lozinku" 
                                value={password}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={handlePasswordStrength}
                                ref={passwordInputRef}
                            />
                            {isPasswordFocused && (
                            <img 
                                src={passwordIcon} 
                                alt="Toggle Password Visibility" 
                                onMouseDown={togglePasswordVisibility}
                                className="password-toggle-icon"
                            />
                            )}
                        </label>
                        <div className="strength-indicator">
                            <div className={`strength-bar ${passwordStrength >= 1 ? (passwordStrength === 1 ? 'red' : passwordStrength === 2 ? 'yellow' : 'green') : ''}`}></div>
                            <div className={`strength-bar ${passwordStrength >= 2 ? (passwordStrength === 2 ? 'yellow' : 'green') : ''}`}></div>
                            <div className={`strength-bar ${passwordStrength >= 3 ? 'green' : ''}`}></div>
                            <div className={`strength-bar ${passwordStrength >= 4 ? 'green' : ''}`}></div>
                        </div>
                        <label htmlFor="">Ponovite lozinku
                            <input 
                                id="confirmPassword"
                                type={inputTypeConfirm} 
                                placeholder="Ponovite lozinku"
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                ref={confirmPasswordInputRef}
                            />
                            {isConfirmPasswordFocused && (
                            <img 
                                src={confirmPasswordIcon} 
                                alt="Toggle Password Visibility" 
                                onMouseDown={toggleConfirmPasswordVisibility}
                                className="confirm-password-toggle-icon"
                            />
                            )}
                        </label>
                    </div>
                        <button onClick={handleNextStep} className="btn">Resetuj lozinku</button>
                    </div>
                    <div className="step-indicator">
                    {[1, 2, 3, 4].map((num) => (
                        <div
                        key={num}
                        className={`step-circle ${num <= step ? "active" : ""}`}
                        >
                        {num}
                        </div>
                    ))}
                    </div>
                </main>
            )}

            {step === 4 && (
                <main className="main-container">
                    <div className="main-div step4">
                        <img className="caffee-academy-logo-zab-lozinka" src={logo} alt="Cafe Aacademy Logo"/>
                        <h2>Uspešno resetovanje lozinke!</h2>
                        <p>Vaša lozinka je uspešno resetovana. Sada možete da se prijavite.</p>
                        <button onClick={handleGoBack} className="btn">Prijavite se</button>
                    </div>
                    <div className="step-indicator">
                    {[1, 2, 3, 4].map((num) => (
                        <div
                        key={num}
                        className={`step-circle ${num <= step ? "active" : ""}`}
                        >
                        {num}
                        </div>
                    ))}
                    </div>
                </main>
            )}

            
        </section>
    );
}