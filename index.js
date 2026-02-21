const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const starCount = 180;

for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.6 + 0.4,
        speed: Math.random() * 0.18 + 0.03,
        alpha: Math.random() * 0.85 + 0.15
    });
}

function drawStarfield() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(star.x, star.y, star.size, star.size);

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = -4;
            star.x = Math.random() * canvas.width;
        }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(drawStarfield);
}

drawStarfield();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const continueBtn = document.getElementById('continueBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');
const progressFill = document.getElementById('progressFill');
const loadingPercent = document.getElementById('loadingPercent');
const desktopIcons = Array.from(document.querySelectorAll('.desktop-icon'));
const bootWindow = document.querySelector('.boot-window');

const statusMessages = [
    'connecting to hacktheplanet.net...',
    'handshake established @ 56k...',
    'syncing bulletin board entries...',
    'rendering desktop shell...'
];

function overlaps(rectA, rectB) {
    return !(
        rectA.right < rectB.left ||
        rectA.left > rectB.right ||
        rectA.bottom < rectB.top ||
        rectA.top > rectB.bottom
    );
}

function scatterDesktopIcons() {
    if (!desktopIcons.length) {
        return;
    }

    const margin = 14;
    const placedRects = [];
    const safeX = window.innerWidth * 0.24;
    const safeY = window.innerHeight * 0.24;

    const zones = [
        { minX: margin, maxX: safeX, minY: margin, maxY: safeY },
        { minX: window.innerWidth - safeX, maxX: window.innerWidth - margin, minY: margin, maxY: safeY },
        { minX: margin, maxX: safeX, minY: window.innerHeight - safeY, maxY: window.innerHeight - margin },
        { minX: window.innerWidth - safeX, maxX: window.innerWidth - margin, minY: window.innerHeight - safeY, maxY: window.innerHeight - margin }
    ];

    const zoneOrder = zones
        .map((zone, index) => ({ zone, index, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(entry => entry.zone);

    const randInRange = (min, max) => {
        if (max <= min) {
            return min;
        }

        return Math.random() * (max - min) + min;
    };

    desktopIcons.forEach((icon, iconIndex) => {
        const iconWidth = icon.offsetWidth || 74;
        const iconHeight = icon.offsetHeight || 66;
        const maxX = Math.max(margin, window.innerWidth - iconWidth - margin);
        const maxY = Math.max(margin, window.innerHeight - iconHeight - margin);
        const zone = zoneOrder[iconIndex % zoneOrder.length];

        const zoneMinX = Math.min(maxX, Math.max(margin, zone.minX));
        const zoneMaxX = Math.max(zoneMinX, Math.min(maxX, zone.maxX - iconWidth));
        const zoneMinY = Math.min(maxY, Math.max(margin, zone.minY));
        const zoneMaxY = Math.max(zoneMinY, Math.min(maxY, zone.maxY - iconHeight));

        let chosen = null;

        for (let tryCount = 0; tryCount < 140; tryCount++) {
            const left = randInRange(zoneMinX, zoneMaxX);
            const top = randInRange(zoneMinY, zoneMaxY);
            const candidate = {
                left,
                top,
                right: left + iconWidth,
                bottom: top + iconHeight
            };

            const intersectsPlaced = placedRects.some(existing => overlaps(candidate, existing));

            if (!intersectsPlaced) {
                chosen = candidate;
                break;
            }
        }

        if (!chosen) {
            const fallbackLeft = Math.random() * (maxX - margin) + margin;
            const fallbackTop = Math.random() * (maxY - margin) + margin;
            chosen = {
                left: fallbackLeft,
                top: fallbackTop,
                right: fallbackLeft + iconWidth,
                bottom: fallbackTop + iconHeight
            };
        }

        icon.style.left = `${Math.round(chosen.left)}px`;
        icon.style.top = `${Math.round(chosen.top)}px`;
        placedRects.push(chosen);
    });
}

scatterDesktopIcons();

continueBtn.addEventListener('click', () => {
    loadingOverlay.classList.add('active');
    continueBtn.disabled = true;

    let progress = 0;

    const fillInterval = setInterval(() => {
        progress += Math.random() * 17 + 6;
        if (progress > 100) {
            progress = 100;
        }

        const messageIndex = Math.min(
            statusMessages.length - 1,
            Math.floor((progress / 100) * statusMessages.length)
        );

        loadingText.textContent = statusMessages[messageIndex];
        progressFill.style.width = `${progress}%`;
        loadingPercent.textContent = `${Math.floor(progress)}%`;

        if (progress >= 100) {
            clearInterval(fillInterval);
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 450);
        }
    }, 180);
});

window.addEventListener('resize', scatterDesktopIcons);
