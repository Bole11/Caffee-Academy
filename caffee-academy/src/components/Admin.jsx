import { useState } from 'react';
import '../styles/Admin.css';
import logo from '../Images/logo.png';

export function Admin() {
  const [orders, setOrders] = useState([
    { products: ['2x Espresso (S)', '1x Americano , sojino mleko (S)', '1x Cappuccino, obicno mleko (M)', '1x Ice Coffee, bademovo mleko (L)'], id: 125479658652, status: '', isOpen: false },
    { products: ['1x Latte (M)', '2x Mocha (S)'], id: 125479658653, status: '', isOpen: false },
    { products: ['1x Čaj od mente'], id: 125479658654, status: '', isOpen: false },
    { products: [''], id: 125479658655, status: '', isOpen: false },
    { products: [''], id: 125479658656, status: '', isOpen: false },
    { products: [''], id: 125479658657, status: '', isOpen: false },
    { products: [''], id: 125479658658, status: '', isOpen: false },
  ]);

  // otvaranje/zatvaranje detalja porudžbine
  const toggleOrderDetails = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, isOpen: !order.isOpen } : order
    ));
  };

  // promena statusa porudžbine

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="admin-container">
      <div className="Status-bar"></div>
      <nav className="Nav-menu">
        <img src={logo} alt="Logo" className="logo" />
      </nav>

      <p>Status porudžbine</p> 
      
      <div className="Status-container">
        <span className="ID_Porudžbine">ID Porudžbine</span>
        <span className="Priprema_se">Priprema se</span>
        <span className="Sprema">Spremna</span>
      </div>
      
            
      <div className="Status-User-container">
        {orders.map(order => (
          <div key={order.id} className="order-row-container">
            
            {/* Red narudžbine */}
            <div className={`order-row ${order.isOpen ? "open" : ""}`} onClick={() => toggleOrderDetails(order.id)}>
              
              {/* Dugme za otvaranje/zatvaranje */}
              <div className="order-item" style={{ cursor: 'pointer' }}>
                {order.isOpen ? '▲' : '▼'}
              </div>

              {/* ID porudžbine */}
              <div className="order-item order-id">{order.id}</div>

              {/* Checkbox za "Priprema se" */}
              <div className="order-item">
                <input
                  type="checkbox"
                  checked={order.status === 'Priprema se'}
                  onChange={() => handleStatusChange(order.id, 'Priprema se')}
                  className="order-checkbox"
                />
              </div>

              {/* Checkbox za "Spremna" */}
              <div className="order-item">
                <input
                  type="checkbox"
                  checked={order.status === 'Spremna'}
                  onChange={() => handleStatusChange(order.id, 'Spremna')}
                  className="order-checkbox"
                />
              </div>
            </div>

            {/* Prikaz liste proizvoda ako je narudžbina otvorena */}
            {order.isOpen && (
              <div className="order-details">
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    
    </div>
  );
}

