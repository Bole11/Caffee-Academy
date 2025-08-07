import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../Images/left-arrow.png";
import avatar from "../Images/Jelena Pavlovic.jpg"
import { useEffect, useState } from "react";
import "../styles/Profile.css";
import loyaltyCup from "../Images/loyaltyCup.png";

export function Profile() {
    const [clickedButtons, setClickedButtons] = useState(Array(10).fill(false));
    const navigate = useNavigate();
     
    function handleGoBack() {
        navigate('/');
    }

    useEffect(() => {
            document.body.classList.add("homepage-body");
    
            return () => {
                document.body.classList.remove("homepage-body");
            };
        }, []);

        function handleButtonClick(index) {
            if (index === 9) return; // Prevent "FREE" button from changing to an image
            
            setClickedButtons((prev) => {
                const newButtons = [...prev];
                newButtons[index] = true; // Mark button as clicked
                return newButtons;
            });
        }
    

    return (
        <section className="profile-main-section">
            <nav className="profile-nav">
                <img src={leftArrow} alt="go back" onClick={handleGoBack} />
                <Link>Log out</Link>
            </nav>
            <main className="profile-main-container">
                <div className="profile-about-user">
                    <img src={avatar}/>
                    <h1>Jelena Pavlović</h1>
                    <h2>jelena.pavlovic@quantox.academy </h2>
                </div>
                <div className="profile-loyalty-program">
                    <h3>Loyalty program</h3>
                    <p>Pridružite se našem loyalty programu i uživajte u besplatnoj kafi! Svaka deseta kafa je na naš račun kao nagrada za vašu vernost.</p>
                </div>
                <div className="profile-coffee-wrap">
                    <div className="profile-coffee">
                    {[...Array(5)].map((_, index) => (
                            <button
                                key={index}
                                className="circle-coffee"
                                onClick={() => handleButtonClick(index)}
                            >
                                {clickedButtons[index] ? <img src={loyaltyCup} alt="Loyalty Cup" /> : null}
                            </button>
                        ))}
                    </div>
                    <div className="profile-coffee">
                    {[...Array(5)].map((_, index) => (
                            <button
                                key={index + 5}
                                className={`circle-coffee ${index === 4 ? "free-button" : ""}`}
                                onClick={() => handleButtonClick(index + 5)}
                            >
                                {index === 4 ? "FREE" : clickedButtons[index + 5] ? <img src={loyaltyCup} alt="Loyalty Cup" /> : null}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    )
}