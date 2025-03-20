import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, get, ref } from "../firebase"; 

import "../styles/Homepage.css";

import logo from "../Images/logo.png";
import cup from "../Images/cup.png";
import plus from "../Images/plus.png";
import Scup from "../Images/Scup.png";
import Mcup from "../Images/Mcup.png";
import Lcup from "../Images/Lcup.png";
import cart from "../Images/cart.png";
import minus from "../Images/minus.png";
import arrowRight from "../Images/right-arrow.png";
import lightTheme from "../Images/light.png";
import darkTheme from "../Images/dark.png";

export function Homepage() {
    const navigate = useNavigate();
    const [coffees, setCoffees] = useState([]);
    const [focusedCoffee, setFocusedCoffee] = useState(null); 
    const [selectedSize, setSelectedSize] = useState({});
    const [focusedSwipebar, setFocusedSwipebar] = useState(false);
    const [coffeeQuantityCount, setCoffeeQuantityCount] = useState(1);
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    function handlePrijavaBtn() {
        navigate('/prijava');
    }

    function handleNaruciBtn() {
        navigate('/status');
    }

    useEffect(() => {
        document.body.classList.add("homepage-body");

        return () => {
            document.body.classList.remove("homepage-body");
        };
    }, []);

    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const fetchCoffees = async () => {
          const coffeeRef = ref(db, 'coffee/');  
          const snapshot = await get(coffeeRef);
          if (snapshot.exists()) {
            setCoffees(Object.values(snapshot.val()));  
          } else {
            console.log("No data available");
          }
        };
    
        fetchCoffees();
      }, []);  

    function handleSelectedCoffee (coffeeId) {
        setFocusedCoffee((prev) => (prev === coffeeId ? null : coffeeId));
    };

    useEffect(() => {
        if (focusedCoffee === null) {
            setSelectedSize((prevSizes) => {
                const updatedSizes = { ...prevSizes };
                coffees.forEach((coffee) => {
                    updatedSizes[coffee.id] = "small"; // Set default size to "small" for each coffee
                });
                return updatedSizes;
            });
        }
    }, [focusedCoffee, coffees]);

    function stopEvent (event) {
        event.stopPropagation();
    };

    function handleSizeChange (event) {
        const {name, value} = event.target;
        const coffeeId = name.split('-').pop();

        setSelectedSize((prev) => ({
            ...prev,
            [coffeeId]: value,
        }))
    };

    function toggleSwipeableFocus() {
        setFocusedSwipebar((prev) => !prev);
    }

    function handleCoffeCountIncrease() {
        setCoffeeQuantityCount((prevCount) => prevCount + 1);
    }

    function handleCoffeCountDecrease() {
        setCoffeeQuantityCount((prevCount) => prevCount - 1);
        if (coffeeQuantityCount <= 1) {
            setCoffeeQuantityCount(1)
        };
    };
    
    function handleAddToCart(coffee) {
        let selectedSizeForCoffee = selectedSize[coffee.id];
        let price = coffee.price[selectedSizeForCoffee];
        let name = coffee.name;
        let quantity = coffeeQuantityCount;

        setOrders((prevOrders) => [...prevOrders, { 
            id: Date.now(), 
            name, 
            price, 
            quantity, 
            size: selectedSizeForCoffee 
        }]);
        setTotal((prevTotal) => prevTotal + price * quantity);
        setCoffeeQuantityCount(1); // Reset quantity after adding to cart
    };
    
    function handleRemoveFromCart(orderId) {
        setOrders((prevOrders) => {
            var orderToRemove = prevOrders.find((order) => {
                return order.id === orderId;
            });
    
            if (!orderToRemove) {
                return prevOrders; // If the order isn't found, do nothing
            }
    
            // Calculate the correct total **before updating state**
            let newTotal = total - (orderToRemove.price * orderToRemove.quantity);
    
            // Ensure the total doesn't go below 0
            setTotal(newTotal > 0 ? newTotal : 0);
    
            // Remove the order from the list
            return prevOrders.filter((order) => {
                return order.id !== orderId;
            });
        });
    };

    return (
        <>
            <section className="homepage-main-section">
                <nav className="homepage-nav">
                    <img src={logo} alt="Cafe Academy Logo" />
                    <button onClick={toggleTheme}>
                {theme === "light" ? 
                <img src={lightTheme}/> :
                <img src={darkTheme}/>}
            </button>
                    <button onClick={handlePrijavaBtn}>Prijavi se</button>
                </nav>
                {coffees.length > 0 ? (
                    coffees.map((coffee) => (
                        <div key={coffee.id}
                            className={`homepage-coffee-item ${focusedCoffee === coffee.id ? "focused" : ""}`}
                            onClick={handleSelectedCoffee.bind(null, coffee.id)} 
                            tabIndex={0} // Makes the div focusable
                            >
                            <div className={`homepage-main-div ${theme}`}>
                                <div className="homepage-coffee-item">
                                    <div className={`homepage-coffee-img-div ${theme}`}>
                                        <img src={cup} alt={coffee.name} className="coffee-img" />
                                    </div>
                                    <div>
                                        <div className={`coffee-info ${theme}`}>
                                            <div className={`coffee-info-focused ${theme}`}>
                                                <h2>{coffee.name}</h2>
                                                <h3>{coffee.price[selectedSize[coffee.id] || "small"]},00 RSD</h3>
                                            </div>
                                            <p>{coffee.description}</p>
                                        </div>
                                        <div className="coffee-price">
                                            <div>
                                                <h2>Cena</h2>
                                                <p>{coffee.price[selectedSize[coffee.id] || "small"]},00 RSD</p>
                                            </div>
                                            <button>
                                                <img src={plus} alt="Plus"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Coffee Size Options */}
                            {focusedCoffee === coffee.id && (
                                <div className={`coffee-options ${theme}`} onClick={stopEvent}>
                                    <label className="coffee-radio">
                                        <input 
                                        type="radio" 
                                        name={`coffee-size-${coffee.id}`} 
                                        id="cupSizeS" value={'small'}
                                        checked={selectedSize[coffee.id] === "small"} 
                                        onChange={handleSizeChange}
                                         />
                                        <img src={Scup} alt="Select Coffee" />
                                    </label>
                                    <label className="coffee-radio">
                                        <input 
                                        type="radio" 
                                        name={`coffee-size-${coffee.id}`} 
                                        id="cupSizeM" value={'medium'} 
                                        onChange={handleSizeChange}
                                        />
                                        <img src={Mcup} alt="Select Coffee" />
                                    </label>
                                    <label className="coffee-radio">
                                        <input 
                                        type="radio" 
                                        name={`coffee-size-${coffee.id}`} 
                                        id="cupSizeL" value={'large'} 
                                        onChange={handleSizeChange}
                                        />
                                        <img src={Lcup} alt="Select Coffee" />
                                    </label>
                                </div>
                            )}

                                {/* Dropdowns for customization */}
                                {focusedCoffee === coffee.id && (
                                    <div className="coffee-customization" onClick={stopEvent}>
                                        <div className={`customization-item ${theme}`}>
                                            <label htmlFor="kafa" id="labelKafa">Zrno</label>
                                            <select name="kafa" id="kafa" defaultValue=''>
                                                <option disabled value='' >Odaberi zrno</option>
                                                <option>Brazil</option>
                                                <option>Kuba</option>
                                                <option>Etiopija</option>
                                        </select>
                                        </div>
                                        <div className={`customization-item ${theme}`}>
                                            <label htmlFor="mleko">Mleko</label>
                                            <select name="mleko" id="mleko" defaultValue=''>
                                                <option disabled value='' >Odaberi mleko</option>
                                                <option>Obično</option>
                                                <option>Bademovo</option>
                                                <option>Sojino mleko</option>
                                            </select>
                                        </div>
                                        <div className={`customization-item ${theme} div-napomena`}>
                                            <label htmlFor="napomena">
                                                <input type="text" className={`napomena ${theme}`} placeholder="Napomena"/>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Quantity and Add to Cart */}
                                {focusedCoffee === coffee.id && (
                                    <div className={`coffee-actions ${theme}`} onClick={stopEvent}>
                                        <div className={`coffee-actions-quantity ${theme}`}>
                                            <button onClick={handleCoffeCountDecrease}>
                                                <img src={minus} alt="Plus"/>
                                            </button>
                                            <span>{coffeeQuantityCount}</span>
                                            <button onClick={handleCoffeCountIncrease}>
                                                <img src={plus} alt="Plus"/>
                                            </button>
                                        </div>
                                        <button id="add-to-cart" onClick={() => handleAddToCart(coffee)}>
                                            <img src={cart} alt="Cart" />
                                             Dodaj u korpu
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Učitavanje kafe...</p>
                )}        
                <div 
                    className={`swipeable-edge-container-main ${focusedSwipebar ? "focused" : ""}`}
                    onClick={toggleSwipeableFocus} 
                    tabIndex={0} // Makes the div focusable
                    >
                    <div className="swipeable-edge-container-div-price">
                        <div className="swipeable-edge-priceDiv">
                            <h4>Ukupno:</h4>
                            <p>{`${total},00 RSD`}</p>
                        </div>
                        <div className={`swipeable-edge-orderDiv ${theme}`} onClick={stopEvent}>
                            <button onClick={handleNaruciBtn}>
                                <img src={arrowRight} alt="Arrow right" />
                                Naruči
                            </button>
                        </div>
                    </div>
                    <div className="swipeable-edge-container-div-orders" onClick={stopEvent}>
                        {focusedSwipebar && orders.length > 0 && (
                            orders.map(function (order) {
                                return (
                                    <div key={order.id} className="swipeable-edge-order-items">
                                        <p>{order.quantity} x {order.name}</p>
                                        <button onClick={() => handleRemoveFromCart(order.id)}>X</button>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </section>  
        </>

    )
}