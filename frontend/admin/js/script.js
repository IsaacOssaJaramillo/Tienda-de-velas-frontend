const supabaseUrl = 'https://irpgynjvxlsshaxgeuie.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycGd5bmp2eGxzc2hheGdldWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NDAyNTIsImV4cCI6MjA4NTAxNjI1Mn0.BvnJQ5JabbG1Jqfl5kQcex2CC_2G6GJEA7Stato7Mes'; // <--- USA LA QUE EMPIEZA POR "eyJ..."
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('btnLogin');

        btn.innerText = "Verificando...";
        btn.disabled = true;

        const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert("Acceso denegado: " + error.message);
            btn.innerText = "Ingresar al Panel";
            btn.disabled = false;
        } else {
            alert("¡Bienvenida al sistema!");
            window.location.href = '/frontend/admin/html/admin-panel.html';
        }
    });
}