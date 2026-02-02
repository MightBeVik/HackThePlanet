const canvas = document.getElementById('codeRain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Code rain characters
const chars = '勝利は勇敢な者のもの=[]{}|;,<>?';
const charArray = chars.split('');

// Drops array
const drops = [];
const dropCount = 50;

for (let i = 0; i < dropCount; i++) {
    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5
    });
}

function draw() {
    // Semi-transparent background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = '16px Courier New';

    drops.forEach(drop => {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.globalAlpha = drop.opacity;
        ctx.fillText(char, drop.x, drop.y);

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
            drop.y = -10;
            drop.x = Math.random() * canvas.width;
            drop.opacity = Math.random() * 0.5 + 0.5;
        }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
}

draw();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Click to enter
document.addEventListener('click', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.classList.add('active');

    // Simulate loading with gradual fill
    let progress = 0;
    const fillInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(fillInterval);
            
            // Redirect to home page after loading
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 500);
        }
    }, 100);
});
