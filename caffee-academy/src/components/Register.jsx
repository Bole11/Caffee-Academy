import { useState, useEffect, useRef } from "react";   
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import leftArrow from "../Images/left-arrow.png";
import showPass from "../Images/pass-show.png";
import hidePass from "../Images/pass-hide.png";
import "../styles/Register.css";


export function Register() {
    const navigate = useNavigate();
    const [inputType, setInputType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(showPass);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [inputTypeTwo, setInputTypeTwo] = useState('password');
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(showPass);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

    const passwordInputRef = useRef(null);
    const confirmPaswordInputRef = useRef(null);

    function handleGoBack() {
        navigate('/prijava');
    };
    function handleRegister() {
        navigate('/');
    }

    function togglePasswordVisibility (event) {

        event.preventDefault();

        setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
        setPasswordIcon((prevIcon) => (prevIcon === showPass ? hidePass : showPass));

        if (passwordInputRef.current) {
            passwordInputRef.current.focus();
        }

        setInputTypeTwo((prevType) => (prevType === 'password' ? 'text' : 'password'));
        setConfirmPasswordIcon((prevIcon) => (prevIcon === showPass ? hidePass : showPass));

        if (confirmPaswordInputRef.current) {
            confirmPaswordInputRef.current.focus();
        }
    };

    const [focusedFields, setFocusedFields] = useState({
        fullName: { focused: false, rule1: false},
        email: { focused: false, rule1: false},
        password: { focused: false, rule1: false, rule2: false, rule3: false, rule4: false },
        confirmPassword: { focused: false, rule1: false },
    });

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        address: "",
        phoneNumber: "",
        gender: "",
    });

    function handleFocus(event) {
        const fieldName = event.target.name;
        setFocusedFields((prev) => ({
            ...prev,
            [fieldName]: { ...prev[fieldName], focused: true},
        }));

        if (fieldName === 'password') {
            setIsPasswordFocused(true);
        }

        if (fieldName === 'confirmPassword') {
            setIsConfirmPasswordFocused(true);
        }
    };

    function handleBlur(event) {
        const fieldName = event.target.name;
        setFocusedFields((prev) => ({
            ...prev,
            [fieldName]: { ...prev[fieldName], focused: false},
        }));

        if (fieldName === 'password') {
            setIsPasswordFocused(false);
        }

        if (fieldName === 'confirmPassword') {
            setIsConfirmPasswordFocused(false);
        }
    };

    function handleChange(event) {
        const { name, value } = event.target;

        setFocusedFields((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                ...(name === 'fullName' && {
                    rule1: value.length > 2 && value.length < 50,
                }),
                ...(name === 'email' && {
                    rule1: value.includes('@'),
                    rule2: value.includes('.com')
                }),
                ...(name === 'password' && {
                    rule1: value.length >= 8,
                    rule2: /[A-Z]/.test(value),
                    rule3: /[a-z]/.test(value),
                    rule4: /\d/.test(value),
                }),
                ...(name === 'confirmPassword' && {
                    rule1: value === document.querySelector('input[name="password"]').value,
                })
            },
        }));

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function getValidationClass(fieldName) {
        return focusedFields[fieldName].focused ? `validation-rules ${fieldName} show` : `validation-rules ${fieldName}`;
    }

    function getContentClass(fieldName, ruleNumber) {
        return focusedFields[fieldName][`rule${ruleNumber}`] ? "valid" : "";
    }
    

    return (
        <section className="register-main-section">
            <nav className="register-nav">
                <img src={leftArrow} alt="go back" onClick={handleGoBack}/>
            </nav>
            <main className="register-main-container">
                <div className="register-title">
                    <img src={logo} alt="Cafe Aacademy Logo"/>
                    <h2>Registruj se</h2>
                </div>
                <div className="register-div-form">
                    <div className="register-form-group">
                        <label htmlFor="fullName">Ime i Prezime
                            <input type="text" id="fullName" name="fullName" placeholder="Unesite Ime i Prezime" autoComplete="on"
                            onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                        </label>
                        <ul className={getValidationClass("fullName")}>
                            <li className={getContentClass("fullName", 1)}>Mora sadržati 2 do 50 karaktera</li>
                        </ul>
                    </div>
                    <div className="register-form-group">Email
                        <label htmlFor="email">
                            <input type="email" id="email" name="email" placeholder="Unesite email adresu" autoComplete="on"
                            onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                        </label>
                        <ul className={getValidationClass("email")}>
                            <li className={getContentClass("email", 1)}>Mora sadržati simbol "@"</li>
                        </ul>
                    </div>
                    <div className="register-form-group">Lozinka
                        <label htmlFor="password">
                            <input 
                            type={inputType} 
                            id="password" 
                            name="password" 
                            placeholder="Unesite Lozinku" 
                            autoComplete="off"
                            onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                            {isPasswordFocused && (
                                    <img
                                    src={passwordIcon}
                                    alt="Toggle Password Visibility"
                                    onMouseDown={togglePasswordVisibility}
                                    className="password-toggle-icon"
                                    ref={passwordInputRef}
                                />
                                )}
                        </label>
                        <ul className={getValidationClass("password")}>
                            <li className={getContentClass("password", 1)}>Mora sadržati najmanje 8 karaktera</li>
                            <li className={getContentClass("password", 2)}>Mora sadržati makar jedno veliko slovo</li>
                            <li className={getContentClass("password", 3)}>Mora sadržati makar jedno malo slovo</li>
                            <li className={getContentClass("password", 4)}>Mora sadržati makar jedan broj</li>
                        </ul>
                    </div>
                    <div className="register-form-group">Potvrdite lozinku
                        <label htmlFor="confirmPassword">
                            <input 
                            type={inputTypeTwo} 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            placeholder="Potvrdite lozinku" 
                            autoComplete="on"
                            onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
                            {isConfirmPasswordFocused && (
                                    <img
                                    src={confirmPasswordIcon}
                                    alt="Toggle Password Visibility"
                                    onMouseDown={togglePasswordVisibility}
                                    className="confirm-password-toggle-icon"
                                    ref={confirmPaswordInputRef}
                                />
                                )}
                        </label>
                        <ul className={getValidationClass("confirmPassword")}>
                            <li className={getContentClass("confirmPassword", 1)}>Šifre se ne podudaraju</li>
                        </ul>
                    </div>
                </div>
                <div className="register-div-submit">
                    <button onClick={handleRegister}>Registruj se</button>
                    <span>Već imate kreiran nalog? <Link to="/prijava">Prijavite se</Link></span>
                </div>
            </main>
        </section>
    );
}