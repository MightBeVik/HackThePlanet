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

// Form handling
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
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
    
    // Save to localStorage for demo purposes
    localStorage.setItem('ctfRegistration_' + Date.now(), JSON.stringify(data));
    
    // Show success message
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    
    // Log the data (in production, this would send to server)
    console.log('Registration Data:', data);
    
    // Optional: Redirect after delay
    setTimeout(() => {
        // window.location.href = 'home.html';
    }, 3000);
});

// Form validation
document.getElementById('registrationForm').addEventListener('change', function() {
    const linuxVM = document.querySelector('input[name="linuxVM"]:checked');
    const linuxDist = document.getElementById('linuxDist');
    
    if (linuxVM && linuxVM.value === 'yes') {
        linuxDist.required = true;
    } else {
        linuxDist.required = false;
    }
});
