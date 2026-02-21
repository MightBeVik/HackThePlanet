(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
        return;
    }

    const mainCursor = document.createElement('div');
    const trailCursor = document.createElement('div');

    mainCursor.className = 'cursor-main';
    trailCursor.className = 'cursor-trail';

    document.body.appendChild(trailCursor);
    document.body.appendChild(mainCursor);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let trailX = targetX;
    let trailY = targetY;

    function setMainPosition() {
        mainCursor.style.transform = `translate(${targetX}px, ${targetY}px)`;
    }

    function animateTrail() {
        trailX += (targetX - trailX) * 0.16;
        trailY += (targetY - trailY) * 0.16;
        trailCursor.style.transform = `translate(${trailX}px, ${trailY}px)`;
        requestAnimationFrame(animateTrail);
    }

    setMainPosition();
    animateTrail();

    document.addEventListener('mousemove', event => {
        targetX = event.clientX;
        targetY = event.clientY;
        setMainPosition();
    });

    document.addEventListener('mouseleave', () => {
        mainCursor.style.opacity = '0';
        trailCursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        mainCursor.style.opacity = '1';
        trailCursor.style.opacity = '0.5';
    });
})();
