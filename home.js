// Matrix background animation
const canvas = document.getElementById('matrixBg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01=[]{}|;,<>?';
const charArray = chars.split('');

const drops = [];
for (let i = 0; i < 100; i++) {
    drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3
    });
}

function animateMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = '14px Courier New';

    drops.forEach(drop => {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.globalAlpha = drop.opacity;
        ctx.fillText(char, drop.x, drop.y);

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
            drop.y = -10;
            drop.x = Math.random() * canvas.width;
        }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animateMatrix);
}

animateMatrix();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
