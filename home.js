const canvas = document.getElementById('starBg');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();

const stars = [];
const starCount = 220;

for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.2 + 0.04,
        alpha: Math.random() * 0.75 + 0.25
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(star.x, star.y, star.size, star.size);

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = -3;
            star.x = Math.random() * canvas.width;
        }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
    setCanvasSize();
});

const feedItems = Array.from(document.querySelectorAll('.feed-item:not(.cta-item)'));
const registrationLink = document.querySelector('.open-link');
const toolbarStatus = document.querySelector('.toolbar span:last-child');

if (registrationLink && feedItems.length > 0) {
    const registrationHref = registrationLink.getAttribute('href');
    const lockNote = document.createElement('p');
    lockNote.className = 'lock-note';
    registrationLink.parentElement.insertBefore(lockNote, registrationLink);

    feedItems.forEach((item, index) => {
        const checkLabel = document.createElement('label');
        checkLabel.className = 'feed-check';

        const checkInput = document.createElement('input');
        checkInput.type = 'checkbox';
        checkInput.className = 'feed-check-input';
        checkInput.setAttribute('aria-label', `Mark task ${index + 1} as completed`);

        const checkText = document.createElement('span');
        checkText.className = 'feed-check-text';
        checkText.textContent = 'Task complete';

        checkLabel.appendChild(checkInput);
        checkLabel.appendChild(checkText);
        item.appendChild(checkLabel);

        checkInput.addEventListener('change', updateRegistrationGate);
    });

    updateRegistrationGate();

    function updateRegistrationGate() {
        const checkedCount = document.querySelectorAll('.feed-check-input:checked').length;
        const allChecked = checkedCount === feedItems.length;

        if (toolbarStatus) {
            toolbarStatus.textContent = `${checkedCount}/${feedItems.length} tasks completed`;
        }

        if (allChecked) {
            registrationLink.classList.remove('locked');
            registrationLink.setAttribute('href', registrationHref);
            registrationLink.setAttribute('aria-disabled', 'false');
            lockNote.textContent = 'All tasks completed. Registration unlocked.';
        } else {
            registrationLink.classList.add('locked');
            registrationLink.removeAttribute('href');
            registrationLink.setAttribute('aria-disabled', 'true');
            lockNote.textContent = `Complete all ${feedItems.length} tasks to unlock registration.`;
        }
    }
}
