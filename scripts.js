// function checkSkills() {
//     const skillItems = document.querySelectorAll('.skill-item');
    
//     skillItems.forEach(item => {
//         const triggerBottom = window.innerHeight * 0.8;
//         const itemTop = item.getBoundingClientRect().top;

//         if (itemTop < triggerBottom) {
//             item.classList.add('show');
//         } else {
//             item.classList.remove('show');
//         }
//     });
// }

// window.addEventListener('scroll', checkSkills);
// window.addEventListener('load', checkSkills);
const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple' ,'pink' ,'brown'];
const balloons = [];
const text = "GOOD NIGHT! 🥰🥰🥰RANJU";

// Balloons
class Balloon {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = Math.random() * 2 + 1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 10);
        ctx.lineTo(this.x, this.y + 30);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
    update() {
        this.y -= this.speed;
        if (this.y < -30) this.y = canvas.height + 30;
    }
}

// Add Balloons
for (let i = 0; i < 105; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    balloons.push(new Balloon(x, y, color));
}

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Text
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Update Balloons
    balloons.forEach(balloon => {
        balloon.update();
        balloon.draw();
    });

    requestAnimationFrame(animate);
}

animate();
