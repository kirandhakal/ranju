const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ['#FF5E5B', '#FFD93D', '#6BCB77', '#4D96FF', '#845EC2'];
const roses = [];
const balloons = [];
let textOpacity = 0;
let textFadeIn = true;

const message = "HAPPY BIRTHDAY TO YOU! Ranju🥰";

// Balloons
class Balloon {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 10 + 15; // Larger radius
        this.color = color;
        this.speed = Math.random() * 1.5 + 0.5; // Slower floating
        this.stringLength = this.radius * 2.5; // Adjust string length
    }

    draw() {
        // Draw balloon
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius / 2,
            this.x,
            this.y,
            this.radius
        );
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, this.color);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();

        // Draw string
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.radius);
        ctx.lineTo(this.x, this.y + this.radius + this.stringLength);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.y -= this.speed;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
    }
}

// Rose-like Flowers
class Rose {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 15;
        this.petalColor = colors[Math.floor(Math.random() * colors.length)];
        this.life = 200; // Short lifespan
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.petalColor;
        ctx.fill();
        ctx.closePath();

        // Draw petals
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const px = this.x + Math.cos(angle) * this.radius;
            const py = this.y + Math.sin(angle) * this.radius;
            ctx.beginPath();
            ctx.arc(px, py, this.radius / 2, 0, Math.PI * 2);
            ctx.fillStyle = this.petalColor;
            ctx.fill();
            ctx.closePath();
        }
    }

    update() {
        this.life--;
    }
}

// Add Balloons
for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    balloons.push(new Balloon(x, y, color));
}

// Add a Rose periodically
setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    roses.push(new Rose(x, y));
}, 1000); // Add roses every second

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Animate Text
    if (textFadeIn) {
        textOpacity += 0.01;
        if (textOpacity >= 1) textFadeIn = false;
    } else {
        textOpacity -= 0.01;
        if (textOpacity <= 0) textFadeIn = true;
    }

    ctx.font = "60px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`;
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);

    // Update and draw balloons
    balloons.forEach(balloon => {
        balloon.update();
        balloon.draw();
    });

    // Update and draw roses
    roses.forEach((rose, index) => {
        if (rose.life <= 0) {
            roses.splice(index, 1); // Remove expired roses
        } else {
            rose.update();
            rose.draw();
        }
    });

    requestAnimationFrame(animate);
}

animate();
