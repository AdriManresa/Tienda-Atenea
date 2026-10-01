import { useState } from 'react';
import './App.css';

export default function App() {
  const catalogo = [
    { 
      id: 1, 
      categoria: 'FRASCO ÁMBAR • 200G',
      nombre: 'Lavanda & Salvia', 
      descripcion: 'Notas relajantes de flores de lavanda silvestre y salvia blanca para un descanso reparador.',
      precio: 14500,
      imagen: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=500&q=60' // Reemplazar por fotos reales
    },
    { 
      id: 2, 
      categoria: 'FRASCO ÁMBAR • 200G',
      nombre: 'Eucalipto & Higo Silvestre', 
      descripcion: 'Frescura herbal con un sutil corazón dulce de higos frescos madurados al sol.',
      precio: 14500,
      imagen: 'https://images.unsplash.com/photo-1596433809252-260c27459d0f?auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 3, 
      categoria: 'CUENCO CERÁMICO • 250G',
      nombre: 'Vainilla Bourbon & Tonka', 
      descripcion: 'Cuenco artesanal esmaltado. Aroma envolvente, cálido y dulce con fondo de maderas suaves.',
      precio: 18200,
      imagen: 'https://images.unsplash.com/photo-1602928551323-28956e568bb9?auto=format&fit=crop&w=500&q=60'
    },
    { 
      id: 4, 
      categoria: 'CAJA ESPECIAL REGALO',
      nombre: 'Set Dúo Bienestar', 
      descripcion: '2 velitas a elección + caja de fósforos largos botánicos en una hermosa presentación kraft.',
      precio: 26000,
      imagen: 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=500&q=60'
    }
  ];

  const [carrito, setCarrito] = useState([]);
  const numeroWhatsApp = "5492617137069"; 

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find(item => item.id === producto.id);
      if (existe) {
        return carritoActual.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  const enviarPedido = () => {
    if (carrito.length === 0) return;
    let mensaje = "¡Hola! Quería hacer el siguiente pedido:\n\n";
    let total = 0;
    carrito.forEach(item => {
      mensaje += `- ${item.cantidad}x ${item.nombre} ($${item.precio * item.cantidad})\n`;
      total += (item.precio * item.cantidad);
    });
    mensaje += `\n*Total a pagar: $${total}*\n\n¡Muchas gracias!`;
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <div className="tienda-container">
      <div className="header-tienda">
        <h1>Nuestras Creaciones</h1>
        <p>Pequeños lotes aromáticos para acompañar tus momentos.</p>
      </div>
      
      <div className="grid-productos">
        {catalogo.map(prod => (
          <div key={prod.id} className="tarjeta-producto">
            <img src={prod.imagen} alt={prod.nombre} className="imagen-producto" />
            <div className="categoria-producto">{prod.categoria}</div>
            <h3 className="nombre-producto">{prod.nombre}</h3>
            <p className="descripcion-producto">{prod.descripcion}</p>
            
            <div className="footer-producto">
              <span className="precio-producto">${prod.precio.toLocaleString('es-AR')}</span>
              <button className="btn-comprar" onClick={() => agregarAlCarrito(prod)}>
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sección del carrito (manteniendo tu funcionalidad intacta) */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <h3>Tu Pedido ({carrito.reduce((acc, item) => acc + item.cantidad, 0)} items)</h3>
        {carrito.length === 0 ? (
          <p style={{ color: '#777' }}>El carrito está vacío</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
              {carrito.map((item, index) => (
                <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  {item.cantidad}x <strong>{item.nombre}</strong> - ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                </li>
              ))}
            </ul>
            <button className="btn-comprar" style={{ width: '100%', padding: '12px', fontSize: '1rem' }} onClick={enviarPedido}>
              Enviar pedido por WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}