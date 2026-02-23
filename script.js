
        gsap.registerPlugin(ScrollTrigger);

        // UI Loader
        window.addEventListener("load", () => {
            gsap.to("#loader", { opacity: 0, duration: 1, onComplete: () => document.getElementById("loader").remove() });
        });

        // Mobile Menu Logic
        const menuBtn = document.getElementById("menuBtn");
        const mobileMenu = document.getElementById("mobileMenu");
        menuBtn.onclick = () => mobileMenu.classList.toggle("translate-x-full");
        function closeMenu() { mobileMenu.classList.add("translate-x-full"); }

        // Project Filtering
        function filterProjects(category) {
            const items = document.querySelectorAll('.project-item');
            const btns = document.querySelectorAll('.filter-btn');
            
            btns.forEach(btn => btn.classList.remove('bg-blue-600', 'active'));
            event.target.classList.add('bg-blue-600');

            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    gsap.to(item, { opacity: 1, scale: 1, duration: 0.5, display: 'block' });
                } else {
                    gsap.to(item, { opacity: 0, scale: 0.8, duration: 0.5, display: 'none' });
                }
            });
        }



        // Progress Bar Animation
gsap.utils.toArray('.h-full').forEach(bar => {
    gsap.from(bar, {
        width: "0%",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: bar,
            start: "top 90%",
        }
    });
});

        // Custom Cursor Follow
        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');
        window.addEventListener("mousemove", (e) => {
            gsap.to(dot, { x: e.clientX - 4, y: e.clientY - 4, duration: 0 });
            gsap.to(outline, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.15 });
        });

        // Language toggle
        const langToggle = document.getElementById('lang-toggle');
        let currentLang = 'en';
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'fr' : 'en';
            document.querySelectorAll('[data-en]').forEach(el => {
                el.innerText = el.getAttribute(`data-${currentLang}`);
            });
            langToggle.innerText = currentLang === 'en' ? 'FR / EN' : 'EN / FR';
        });

        // Theme Toggle
        document.getElementById("themeToggle").onclick = () => document.body.classList.toggle("light");

        // Magnetic Effect
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.onmousemove = (e) => {
                const rect = btn.getBoundingClientRect();
                gsap.to(btn, { x: (e.clientX - rect.left - rect.width/2) * 0.4, y: (e.clientY - rect.top - rect.height/2) * 0.4, duration: 0.3 });
            };
            btn.onmouseleave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5 });
        });

        // Particle Background
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        function initParticles() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            for(let i=0; i<60; i++) particles.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: Math.random()-0.5, vy: Math.random()-0.5});
        }
        function drawParticles() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = "#3b82f6";
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if(p.x<0 || p.x>canvas.width) p.vx*=-1;
                if(p.y<0 || p.y>canvas.height) p.vy*=-1;
                ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI*2); ctx.fill();
            });
            requestAnimationFrame(drawParticles);
        }
        initParticles(); drawParticles();
