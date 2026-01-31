const supabaseUrl = 'https://irpgynjvxlsshaxgeuie.supabase.co';
const supabaseKey = 'sb_publishable_LFzpTNq551UgF7Niftmoog_wWoC7iBS'; 
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('foto-archivo');
    
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                let preview = document.getElementById('img-preview-upload');
                if (!preview) {
                    preview = document.createElement('img');
                    preview.id = 'img-preview-upload';
                    // Los estilos ya están en el CSS por ID
                    fileInput.parentElement.appendChild(preview);
                }
                preview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});

async function subirVela() {
    const btn = document.querySelector('.btn-publish');
    const nombre = document.getElementById('nombre').value.trim();
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    const fotoFile = document.getElementById('foto-archivo').files[0];

    if (!nombre || !precio || !fotoFile) {
        alert("⚠️ Por favor, rellena los campos obligatorios.");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = "Subiendo...";

    try {
        const extension = fotoFile.name.split('.').pop();
        const nombreLimpio = `${Date.now()}_vela.${extension}`;

        const { data: uploadData, error: uploadError } = await _supabase.storage
            .from('imagens-velas')
            .upload(nombreLimpio, fotoFile);

        if (uploadError) throw new Error("Error subiendo imagen");

        const { data: urlData } = _supabase.storage
            .from('imagens-velas')
            .getPublicUrl(nombreLimpio);

        const { error: dbError } = await _supabase
            .from('productos')
            .insert([{
                nombre: nombre,
                precio: parseFloat(precio),
                descripcion: descripcion,
                imagen_url: urlData.publicUrl
            }]);

        if (dbError) throw new Error("Error guardando datos");

        const crearOtra = confirm("¡Éxito! ¿Te gustaría crear otra vela?");

        if (crearOtra) {
            limpiarFormulario();
            btn.disabled = false;
            btn.innerHTML = "Publicar Vela";
        } else {
            window.location.href = 'admin-panel.html';
        }

    } catch (error) {
        alert("❌ " + error.message);
        btn.disabled = false;
        btn.innerHTML = "Publicar Vela";
    }
}

function limpiarFormulario() {
    document.getElementById('nombre').value = "";
    document.getElementById('precio').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('foto-archivo').value = "";
    const preview = document.getElementById('img-preview-upload');
    if (preview) preview.remove();
}