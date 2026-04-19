const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Matrix characters - Katakana + Latin + Numerals
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';

const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];

// Initialize drops
function initMatrix() {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // start at random positions above screen
    }
}
initMatrix();
window.addEventListener('resize', initMatrix);

// Draw the matrix effect
function draw() {
    // Semi-transparent black to create trailing effect
    ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00E5FF'; // Cyber blue text
    ctx.font = fontSize + 'px "Roboto Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));

        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Randomly make some characters brighter for a nice effect
        if (Math.random() > 0.95) {
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00E5FF';
        } else {
            ctx.fillStyle = '#00E5FF';
            ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
    }
    setTimeout(() => requestAnimationFrame(draw), 50);
}

// Start animation
draw();
