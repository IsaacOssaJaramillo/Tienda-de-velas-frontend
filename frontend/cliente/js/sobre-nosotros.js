document.addEventListener('DOMContentLoaded', () => {
    // 1. Animación de aparición suave (Fade-in)
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // 2. Contador animado para las estadísticas
    const counters = document.querySelectorAll('.number');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200; // A mayor número, más lento
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        
        // Ejecutar contador cuando sea visible
        const counterObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) updateCount();
        });
        counterObserver.observe(counter);
    });
});