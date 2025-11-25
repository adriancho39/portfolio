// Navbar burger
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate burger lines
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 3D Cards hover effect (Smoother)
const cards = document.querySelectorAll('.card-3d, .project-card-3d');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Terminal effect (Optimized)
const canvas = document.getElementById('terminal');
const ctx = canvas.getContext('2d');

let width, height;
let columns, drops;
const fontSize = 14;
const chars = '01'; // Binary rain for more "cyber" feel, or mix

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawTerminal() {
    ctx.fillStyle = 'rgba(11, 12, 16, 0.05)'; // Fade effect
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0f0'; // Green text
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    requestAnimationFrame(drawTerminal);
}

// Start animation loop
requestAnimationFrame(drawTerminal);


// HUD Radar (Optimized)
const radarCanvas = document.getElementById('radar');
if (radarCanvas) {
    const radarCtx = radarCanvas.getContext('2d');
    radarCanvas.width = 150;
    radarCanvas.height = 100;

    let radarAngle = 0;

    function drawRadar() {
        const w = radarCanvas.width;
        const h = radarCanvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) / 2 - 5;

        radarCtx.clearRect(0, 0, w, h);

        // Circles
        radarCtx.strokeStyle = 'rgba(0, 255, 153, 0.3)';
        radarCtx.lineWidth = 1;
        for (let i = 1; i <= 3; i++) {
            radarCtx.beginPath();
            radarCtx.arc(cx, cy, (radius / 3) * i, 0, Math.PI * 2);
            radarCtx.stroke();
        }

        // Sweep
        radarCtx.beginPath();
        radarCtx.moveTo(cx, cy);
        radarCtx.arc(cx, cy, radius, radarAngle, radarAngle + 0.2);
        radarCtx.lineTo(cx, cy);
        radarCtx.fillStyle = 'rgba(0, 255, 153, 0.5)';
        radarCtx.fill();

        // Blips
        if (Math.random() > 0.95) {
            const r = Math.random() * radius;
            const a = Math.random() * Math.PI * 2;
            const bx = cx + Math.cos(a) * r;
            const by = cy + Math.sin(a) * r;
            radarCtx.fillStyle = '#fff';
            radarCtx.fillRect(bx, by, 2, 2);
        }

        radarAngle += 0.05;
        requestAnimationFrame(drawRadar);
    }
    drawRadar();
}

// HUD Graph (Optimized)
const graphCanvas = document.getElementById('graph');
if (graphCanvas) {
    const graphCtx = graphCanvas.getContext('2d');
    graphCanvas.width = 150;
    graphCanvas.height = 100;

    const graphData = [];
    const maxPoints = 30;

    function drawGraph() {
        const w = graphCanvas.width;
        const h = graphCanvas.height;

        graphCtx.clearRect(0, 0, w, h);

        // Grid
        graphCtx.strokeStyle = 'rgba(0, 255, 153, 0.1)';
        graphCtx.beginPath();
        for (let i = 0; i < w; i += 20) { graphCtx.moveTo(i, 0); graphCtx.lineTo(i, h); }
        for (let i = 0; i < h; i += 20) { graphCtx.moveTo(0, i); graphCtx.lineTo(w, i); }
        graphCtx.stroke();

        // Data
        if (graphData.length >= maxPoints) graphData.shift();
        graphData.push(Math.random() * h * 0.8 + h * 0.1);

        graphCtx.beginPath();
        graphCtx.strokeStyle = '#00ff99';
        graphCtx.lineWidth = 2;

        for (let i = 0; i < graphData.length; i++) {
            const x = (i / (maxPoints - 1)) * w;
            const y = h - graphData[i];
            if (i === 0) graphCtx.moveTo(x, y);
            else graphCtx.lineTo(x, y);
        }
        graphCtx.stroke();

        setTimeout(() => requestAnimationFrame(drawGraph), 100); // Throttled update
    }
    drawGraph();
}
