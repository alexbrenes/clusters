const r = 5;
const N = 2;
const H = 600;
const W = 800;
const particles = [];

function rule(circles1, circlers2, g) {
    for (let i = 0; i < circles1.length; i++) {
        fx = 0;
        fy = 0;
        for (let j = 0; j < circlers2.length; j++) {
            a = circles1[i];
            b = circlers2[j];
            dx = a.x - b.x;
            dy = a.y - b.y;
            d = Math.sqrt(dx * dx + dy * dy);
            if (d > 0 && d < 80) {
                F = (g * 1) / d;
                fx += F * dx;
                fy += F * dy;
            }
        }
        a.vx = (a.vx + fx) * 0.5;
        a.vy = (a.vy + fy) * 0.5;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x <= 0 || a.x >= W) { a.vx *= -1; }
        if (a.y <= 0 || a.y >= H) { a.vy *= -1; }
    }
}

function createCircles(n, color) {
    circles = [];
    for (let i = 0; i < n; ++i) {
        circles.push({
            x: Math.floor(Math.random() * W),
            y: Math.floor(Math.random() * H),
            vx: 0,
            vy: 0,
            color: color
        });
        particles.push(circles[i]);
    }
    return circles;
}

function drawCircle(circle, ctx) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = circle.color;
    ctx.fill();
}

function draw(circles, ctx) {
    for (let i = 0; i < circles.length; ++i) {
        drawCircle(circles[i], ctx);
    }
}

function main() {
    const canvas = document.getElementById("clusters");
    const ctx = canvas.getContext("2d");
    yellow = createCircles(200, "yellow");
    red = createCircles(200, "red");
    purple = createCircles(200, "purple");
    draw(yellow, ctx);
    update = () => {
        rule(yellow, yellow, -0.1);
        rule(yellow, red, -0.1);
        rule(red, yellow, 0.1);
        rule(purple, yellow, 0.1);
        rule(red, purple, -0.1);
        rule(purple, purple, 0.8);
        // rule(red, yellow, 0.01);
        ctx.clearRect(0, 0, W, H);
        // draw(0, 0, "black", 500);
        draw(particles, ctx);
        requestAnimationFrame(update);
    };
    update();
}

window.addEventListener('load', function () {
    main();
})