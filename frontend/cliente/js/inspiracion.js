document.addEventListener('DOMContentLoaded', () => {
    const moments = document.querySelectorAll('.moment');

    const mostrarContenido = () => {
        moments.forEach(m => {
            const posicion = m.getBoundingClientRect().top;
            const pantalla = window.innerHeight / 1.2;

            if (posicion < pantalla) {
                m.style.opacity = '1';
                m.style.transform = 'translateX(0)';
            }
        });
    };

    // Estilo inicial antes de aparecer
    moments.forEach(m => {
        m.style.opacity = '0';
        m.style.transform = 'translateX(-20px)';
        m.style.transition = 'all 0.8s ease-in-out';
    });

    window.addEventListener('scroll', mostrarContenido);
    mostrarContenido(); // Chequeo inicial
});