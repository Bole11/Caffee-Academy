import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Status.css"; // Uvoz CSS fajla

import clock from '../Images/Clock.png';
import leftArrow from '../Images/left-arrow.png';

export function Status() {
    const totalTime = 900; // Ukupno vreme 15 minuta
    const [time, setTime] = useState(totalTime);
    const [checkpoint, setCheckpoint] = useState(0);
    const navigate = useNavigate();

    function handleGoBack() {
        navigate('/')
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setCheckpoint(Math.floor((totalTime - time) / 300)); // Menja se svakih 5 min
    }, [time]);

    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `00:${min}:${sec}`;
    };

    return (
        <div className="Status-porudzbine">
            <div className="Status-bar"></div>
                <nav className="nav-menu-status"></nav>
            <div className="Status-Id-porudzbine">
        <span>ID porudzbine: 125479</span>
    </div>

    <div className="timer-container">
        <img src={clock} alt="Clock Icon" className="clock-icon" />
        <div className="timer-display">
            <span className="time-text">{formatTime(time)}</span>
        </div>
    </div>

    <div className="status-container">
        {/* Krugovi za status */}
        <div className="status-circle-container">
            <div className={`circle ${checkpoint >= 0 ? "active-circle" : "inactive-circle"}`}>
                {checkpoint >= 0 && <span className="checkmark">✔</span>}
            </div>
            <div className={`line ${checkpoint >= 1 ? "active-line" : "inactive-line"}`} />
            <div className={`circle ${checkpoint >= 1 ? "active-circle" : "inactive-circle"}`}>
                {checkpoint >= 1 && <span className="checkmark">✔</span>}
            </div>
            <div className={`line ${checkpoint >= 2 ? "active-line" : "inactive-line"}`} />
            <div className={`circle ${checkpoint >= 2 ? "active-circle" : "inactive-circle"}`}>
                {checkpoint >= 2 && <span className="checkmark">✔</span>}
            </div>
        </div>

        {/* Lista statusa */}
        <div className="status-list">
            <div className={`status ${checkpoint >= 0 ? "active" : "inactive"}`}>
                Porudžbina primljena
            </div>
            <div className={`status ${checkpoint >= 1 ? "active" : "inactive"}`}>
                Kafa se priprema
            </div>
            <div className={`status ${checkpoint >= 2 ? "active" : "inactive"}`}>
                Kafa je spremna
            </div>
        </div>

        {/* Slika */}
        <img
            src="https://s3-alpha-sig.figma.com/img/7bd3/0d37/9309ba0b064c18dc883527e0176c5701?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IkdIfvHKMHJ2TUuiVTXKL6Tz~HhYcyBB1krZUlujwoSTq~gj1DRNriP~kR7ozQNEk4dnqXHMxrMtMEtisbUWByzdKIxAC6P0N26Dn5dpin~-5OYZnXe2LaH63FLugXJk3PjtWAiGrvimN69cfElEaYKaeUWTgwEqV~8hY2JGbiDxGhvH30~NKldeKaRxL6d3pnvuKUYRoKcnnUyt1crpVvSmtExEmt5Af1RhnrHIG~bGGdlwLZ0Afnf4oXooHPqRlfZA3mgpnT2BXarroed7uREDtY6qcHBU9zIR7xK~fK3gu-Z7oyLzw~DV0WUKgSNws3zkA0Hq1bHOjvIE2bCcIg__"
            alt="GIF animacija"
        />

        {/* Tekst */}
        <p>Porudžbina je primljena</p>
    </div>
</div>
    );
}
