const canvas = document.getElementById('starBg');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();

const stars = [];
const starCount = 200;

for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.4 + 0.3,
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

const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'home.html';
    });
}

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        teamName: formData.get('teamName'),
        teamSize: formData.get('teamSize'),
        mode: formData.get('mode'),
        leaderName: formData.get('leaderName'),
        leaderEmail: formData.get('leaderEmail'),
        leaderPhone: formData.get('leaderPhone'),
        linuxVM: formData.get('linuxVM'),
        linuxDist: formData.get('linuxDist'),
        adapter: formData.get('adapter'),
        experience: formData.get('experience'),
        interests: formData.getAll('interests'),
        ethics: formData.get('ethics'),
        waiver: formData.get('waiver'),
        notes: formData.get('notes'),
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('ctfRegistration_' + Date.now(), JSON.stringify(data));

    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';

    console.log('Registration Data:', data);
});

document.getElementById('registrationForm').addEventListener('change', function() {
    const linuxVM = document.querySelector('input[name="linuxVM"]:checked');
    const linuxDist = document.getElementById('linuxDist');

    if (linuxVM && linuxVM.value === 'yes') {
        linuxDist.required = true;
    } else {
        linuxDist.required = false;
    }
});
