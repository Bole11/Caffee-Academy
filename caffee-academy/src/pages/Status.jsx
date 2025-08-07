import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Status.css"; 

import clock from '../Images/Clock.png';
import leftArrow from '../Images/left-arrow.png';
import kafaGotova from '../Images/kafaGotova.png';
import prirpemaKafe from '../Images/pripremaKafe.png';
import porudzbinaSpremna from '../Images/porudzbinaSpremna.gif';

export function Status() {
    const totalTime = 10; 
    const [time, setTime] = useState(totalTime);
    const [checkpoint, setCheckpoint] = useState(0);
    const [image, setImage] = useState(porudzbinaSpremna); 
    const [message, setMessage] = useState("Porudžbina je primljena");
    const navigate = useNavigate();

    function handleGoBack() {
        navigate('/')
    }

    useEffect(() => {
        document.body.classList.add("status-body");

        return () => {
            document.body.classList.remove("status-body");
        };
    }, []);

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
    if (time > 5) {
        setCheckpoint(0);
        setImage(porudzbinaSpremna);
    } else if (time > 0) {
        setCheckpoint(1);
        setImage(prirpemaKafe);
    } else if (time === 0) {
        setCheckpoint(2);
        setImage(kafaGotova);
    }
    }, [time]);

    useEffect(() => {
        const messages = [
            "Porudžbina je primljena",
            "Kafa se priprema",
            "Kafa je spremna"
        ];
        setMessage(messages[checkpoint]);
    }, [checkpoint]);


    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return (
            <>
                <span className="time-part">00</span>
                <span className="time-colon">:</span>
                <span className="time-part">{min}</span>
                <span className="time-colon">:</span>
                <span className="time-part">{sec}</span>
            </>
        );
    };

    return (
        <div className="Status-porudzbine">
            <nav className="nav-menu-status">
                <img src={leftArrow} alt="go back" onClick={handleGoBack}/>
            </nav>

            <div className="status-container">
                <div className="Status-Id-porudzbine">
                    <span>ID porudzbine: 125479</span>
                </div>

                <div className="timer-container">
                    <img src={clock} alt="Clock Icon" className="clock-icon" />
                    <div className="timer-display">
                        <span className="time-text">{formatTime(time)}</span>
                    </div>
                </div>

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

                <div className="div-img">
                    <img src={image} alt="Status image" />
                </div>

                <div className="div-message">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}
