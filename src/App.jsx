import { useState } from 'react';
import './App.css';
// COMPONENTE 1: La barra superior
function Navbar() {
  return (
    <nav className="navbar">
      <div style={{ width: '150px' }}>
        {/* Acá después podés poner la etiqueta <img> con tu favicon SVG si querés el logo original */}
        <h2 style={{ fontFamily: 'Cinzel', fontSize: '1.5rem', margin: 0 }}>ATENEA</h2>
      </div>
      
      <ul className="nav-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Tienda</a></li>
        <li><a href="#">Colecciones</a></li>
        <li><a href="#">Sobre Atenea</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>

      <div className="nav-icons">
        {/* Iconos simples usando emojis o caracteres, luego los podés cambiar por SVGs reales */}
        <span title="Buscar">🔍</span>
        <span title="Carrito">🛍️</span>
      </div>
    </nav>
  );
}

// COMPONENTE 2: La portada principal
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">BIENVENIDOS A</p>
        <h1 className="hero-title">ATENEA</h1>
        <p className="hero-category">VELAS DE SOJA</p>
        <p className="hero-script">Velas que cuentan historias.</p>
        <button className="btn-primary">DESCUBRIR LA COLECCIÓN →</button>
      </div>

      <div className="hero-nota-mano">
        <p>Hechas a mano<br/>con amor y paciencia.</p>
        <span style={{ fontSize: '1.5rem' }}>♡</span>
      </div>
    </section>
  );
}
// COMPONENTE 3: Sobre la Creadora
function SobreLaCreadora() {
  return (
    <section className="sobre-creadora">
      <div className="polaroid-container">
        <div className="polaroid">
          {/* Reemplazá este link por una foto real de tu prima trabajando */}
          <img 
            src="https://images.unsplash.com/photo-1544602816-5bc77b3b417e?auto=format&fit=crop&w=600&q=80" 
            alt="Creadora de Atenea" 
          />
          <div className="polaroid-text">Rocío ♡</div>
        </div>
      </div>
      
      <div className="texto-creadora">
        <h3>HOLA, SOY ROCÍO</h3>
        <h4>la creadora de Atenea</h4>
        
        <p>
          Soy una joven emprendedora de Mendoza. Cada una de mis creaciones está hecha a mano, 
          con dedicación, tiempo y mucho amor.
        </p>
        <p>
          Para mí, las velas no son solo un producto, son un propósito. Cada una tiene un <strong>motivo, una intención</strong>. 
          Nacen de momentos, de emociones, de lo que me mueve y de todo lo que creo que puede hacer bien.
        </p>
        <p>
          Hay velas para cuando estás bien, para cuando estás triste, para cuando necesitás una salida, 
          para cuando necesitás calma, para cuando querés empezar de nuevo...
        </p>
        
        <p className="firma">Para todo, siempre hay una Atenea. ♡</p>
      </div>
    </section>
  );
}
// COMPONENTE 4: Catálogo y Carrito
function Catalogo() {
  const [carrito, setCarrito] = useState([]);
  const numeroWhatsApp = "5492610000000"; // Reemplazá con el número de tu prima (código de Mendoza 261)

  const productos = [
    { id: 1, nombre: 'Vela Renacer', precio: 12500, imagen: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=500&q=80' },
    { id: 2, nombre: 'Vela Soltar', precio: 12500, imagen: 'https://images.unsplash.com/photo-1596433809252-260c27459d0f?auto=format&fit=crop&w=500&q=80' },
    { id: 3, nombre: 'Vela Calma', precio: 14000, imagen: 'https://images.unsplash.com/photo-1602928551323-28956e568bb9?auto=format&fit=crop&w=500&q=80' },
    { id: 4, nombre: 'Difusor Refugio', precio: 18000, imagen: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=500&q=80' }
  ];

  const agregarAlCarrito = (producto) => {
    setCarrito((actual) => {
      const existe = actual.find(item => item.id === producto.id);
      if (existe) {
        return actual.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...actual, { ...producto, cantidad: 1 }];
    });
  };

  const enviarPedido = () => {
    if (carrito.length === 0) return;
    let mensaje = "¡Hola Atenea! Quería hacer el siguiente pedido:\n\n";
    let total = 0;
    
    carrito.forEach(item => {
      mensaje += `🌿 ${item.cantidad}x ${item.nombre} ($${item.precio * item.cantidad})\n`;
      total += (item.precio * item.cantidad);
    });
    
    mensaje += `\n*Total a pagar: $${total}*\n\n¡Muchas gracias! ✨`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <section className="catalogo-section">
      <div className="catalogo-header">
        <h2>VOLVER A ENCENDERME</h2>
        <p>No siempre estoy bien, pero siempre busco una razón para volver a encenderme.</p>
      </div>

      <div className="catalogo-grid">
        {productos.map(prod => (
          <div key={prod.id} className="producto-card">
            <img src={prod.imagen} alt={prod.nombre} />
            <h3 className="producto-nombre">{prod.nombre}</h3>
            <p className="producto-precio">${prod.precio.toLocaleString('es-AR')}</p>
            <button className="btn-agregar" onClick={() => agregarAlCarrito(prod)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Carrito de Compras */}
      <div className="carrito-container">
        <h3>Tu Pedido</h3>
        {carrito.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic' }}>Aún no elegiste ninguna vela.</p>
        ) : (
          <>
            {carrito.map((item, index) => (
              <div key={index} className="carrito-item">
                <span>{item.cantidad}x <strong>{item.nombre}</strong></span>
                <span>${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #eee', marginTop: '15px', paddingTop: '15px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
              <span>TOTAL:</span>
              <span>${carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toLocaleString('es-AR')}</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={enviarPedido}>
              ENVIAR PEDIDO POR WHATSAPP
            </button>
          </>
        )}
      </div>
    </section>
  );
}
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SobreLaCreadora /> 
      <Catalogo />
    </>
  );
}