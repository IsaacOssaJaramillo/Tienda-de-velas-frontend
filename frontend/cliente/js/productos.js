const supabaseUrl = 'https://irpgynjvxlsshaxgeuie.supabase.co';
const supabaseKey = 'sb_publishable_LFzpTNq551UgF7Niftmoog_wWoC7iBS';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let carrito = [];

// Cargar productos
async function cargarProductos() {
    const { data: velas, error } = await _supabase.from('productos').select('*');
    if (error) return;

    const contenedor = document.getElementById('contenedor-velas');
    contenedor.innerHTML = velas.map(vela => `
        <div class="card-producto">
            <img src="${vela.imagen_url}">
            <h3>${vela.nombre}</h3>
            <p class="price">$${vela.precio.toLocaleString()}</p>
            <button onclick="agregarAlCarrito(${vela.id}, '${vela.nombre}', ${vela.precio})">
                Añadir al Carrito
            </button>
        </div>
    `).join('');
}

function agregarAlCarrito(id, nombre, precio) {
    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    actualizarInterfazCarrito();
    // Abrir el carrito automáticamente al añadir
    if (!document.getElementById('carrito-lateral').classList.contains('open')) toggleCarrito();
}

function actualizarInterfazCarrito() {
    const container = document.getElementById('cart-items-container');
    const countLabel = document.getElementById('cart-count');
    const totalLabel = document.getElementById('cart-total');
    
    let total = 0;
    let totalItems = 0;
    
    container.innerHTML = carrito.map(item => {
        total += item.precio * item.cantidad;
        totalItems += item.cantidad;
        return `
            <div class="cart-item">
                <p><strong>${item.nombre}</strong> x ${item.cantidad}</p>
                <p>$${(item.precio * item.cantidad).toLocaleString()}</p>
            </div>
        `;
    }).join('');

    countLabel.innerText = totalItems;
    totalLabel.innerText = `$${total.toLocaleString()}`;
}

function toggleCarrito() {
    document.getElementById('carrito-lateral').classList.toggle('open');
    const overlay = document.getElementById('cart-overlay');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

function enviarPedido() {
    const numero = "573000000000"; // Número de la dueña
    let mensaje = "¡Hola! Quiero hacer un pedido:\n\n";
    
    carrito.forEach(item => {
        mensaje += `- ${item.cantidad}x ${item.nombre} ($${(item.precio * item.cantidad).toLocaleString()})\n`;
    });
    
    mensaje += `\n*Total: ${document.getElementById('cart-total').innerText}*`;
    
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', cargarProductos);