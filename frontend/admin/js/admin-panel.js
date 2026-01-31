const supabaseUrl = 'https://irpgynjvxlsshaxgeuie.supabase.co';
const supabaseKey = 'sb_publishable_LFzpTNq551UgF7Niftmoog_wWoC7iBS';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

let todasLasVelas = [];

async function cargarInventario() {
    const { data, error } = await _supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return console.error("Error:", error);

    todasLasVelas = data;
    renderizarTabla(todasLasVelas);
}

function renderizarTabla(lista) {
    const tabla = document.getElementById('lista-velas');
    const contador = document.getElementById('total-velas');

    tabla.innerHTML = "";
    contador.innerText = lista.length;

    lista.forEach(vela => {
        tabla.innerHTML += `
            <tr>
                <td><img src="${vela.imagen_url}" class="img-preview"></td>
                <td><strong>${vela.nombre}</strong></td>
                <td>$${vela.precio.toLocaleString()}</td>
                <td>${vela.descripcion || 'Sin descripción'}</td>
                <td>
                    <button class="btn-delete" onclick="eliminarVela(${vela.id}, '${vela.nombre}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function filtrarVelas() {
    const texto = document.getElementById('buscador').value.toLowerCase();
    const filtradas = todasLasVelas.filter(v => v.nombre.toLowerCase().includes(texto));
    renderizarTabla(filtradas);
}

async function eliminarVela(id, nombre) {
    if (confirm(`¿Eliminar definitivamente la vela "${nombre}"?`)) {
        const { error } = await _supabase.from('productos').delete().eq('id', id);
        if (error) alert("Error al borrar");
        else cargarInventario();
    }
}

document.addEventListener('DOMContentLoaded', cargarInventario);