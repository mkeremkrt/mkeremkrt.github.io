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
// Terminal Logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');
const promptPath = document.getElementById('prompt-path');

const TUX_ASCII = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⢫⡌⣿⣿⢉⣤⠹⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣜⠗⠉⠙⠘⠻⢡⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣥⡀⠀⢀⡠⣐⣸⣿⡿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠇⠉⠒⠶⠉⠀⠀⢻⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⣿⠃⠀⠀⠀⠁⠀⠀⠀⠀⢻⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣼⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣦⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⡆⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣾⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡀⠀⠀⠀
⠀⠀⠀⢀⣾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡇⠀⠀⠀
⠀⠀⠀⡸⠋⠛⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⢼⣿⣿⣿⣿⠃⠀⠀⠀
⡐⠀⠈⠀⠀⠀⠈⢻⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⢿⡿⠿⠃⠀⠀⠀⠀
⢡⠀⠀⠀⠀⠀⠀⠀⠻⣿⠷⠀⠀⠀⠀⠀⠀⠀⣠⠃⠀⠀⠀⠀⠀⠀⠐⠠⡀
⡄⠀⠀⠀⠀⠀⠀⠀⠀⠑⣄⠀⠀⠀⠀⣀⣤⣾⣿⠀⠀⠀⠀⠀⠀⠀⣀⡠⠃
⠒⠠⠤⣀⣄⡀⠀⠀⢀⣰⣿⠿⠿⠿⠿⠿⠿⠿⣿⡄⠀⠀⢀⡠⠔⠉⠀⠀⠀
⠀⠀⠀⠀⠀⠉⠙⠻⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠈⠻⠷⠿⠋⠀⠀⠀⠀⠀⠀`;

// Virtual File System
const vfs = {
    'readme.txt': "I am Mustafa Kerem Kurt, a passionate developer based in the digital realm. I specialize in Linux, web technologies, and solving complex problems with elegant code.",
    'medium.txt': { type: 'link', url: 'https://medium.com/@mkeremkurt' },
    'blog': {
        'welcome_to_my_lab.md': "Welcome to my lab! This is where I share my journey through the world of technology. Stay tuned for more updates.",
        'why_linux.md': "Linux is not just an operating system; it's a philosophy of freedom and exploration. In this post, I discuss why I chose the Tux way."
    },
    'projects': {
        'neural_net_viz': "A real-time visualization tool for neural network training processes. Built with React and D3.js.",
        'cyber_shell': "A custom shell environment for security professionals, featuring automated auditing tools."
    },
    'guides': {
        'vim_pro_tips.txt': "1. Use 'ciw' to change inside a word.\n2. '.' repeats the last command.\n3. 'ggVG' selects all text.",
        'docker_basics.md': "Docker allows you to package your applications into containers. Use 'docker-compose up -d' to start services in the background."
    }
};

let currentPath = [];
let commandHistory = [];
let historyIndex = -1;

function getVFSNode(path) {
    let node = vfs;
    for (const dir of path) {
        if (node[dir] && typeof node[dir] === 'object' && node[dir].type !== 'link') {
            node = node[dir];
        } else {
            return null;
        }
    }
    return node;
}

function updatePrompt() {
    const pathStr = currentPath.length ? '/' + currentPath.join('/') : '~';
    promptPath.innerText = pathStr;
}

function printOutput(text, className = '') {
    const line = document.createElement('div');
    line.className = 'output-line ' + className;
    line.innerText = text;
    terminalOutput.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function printHTML(html, className = '') {
    const line = document.createElement('div');
    line.className = 'output-line ' + className;
    line.innerHTML = html;
    terminalOutput.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function handleNeofetch() {
    const info = `
<div class="neofetch-container">
    <pre class="neofetch-ascii">${TUX_ASCII}</pre>
    <div class="neofetch-info">
        <div><span class="info-key">mkeremkurt</span>@<span class="info-key">lab</span></div>
        <div>-------------------</div>
        <div><span class="info-key">OS</span>: KeremOS (Linux x86_64)</div>
        <div><span class="info-key">Host</span>: Portfolio v2.0</div>
        <div><span class="info-key">Kernel</span>: 5.15.0-antigravity</div>
        <div><span class="info-key">Uptime</span>: Since 2024</div>
        <div><span class="info-key">Shell</span>: Antigravity-sh 1.0</div>
        <div><span class="info-key">Resolution</span>: ${window.innerWidth}x${window.innerHeight}</div>
        <div><span class="info-key">CPU</span>: AI Core (8) @ 3.4GHz</div>
        <div><span class="info-key">Memory</span>: 16GB / 64GB</div>
        <div style="display: flex; gap: 5px; margin-top: 5px;">
            <div style="background: #000; width: 20px; height: 10px;"></div>
            <div style="background: #f00; width: 20px; height: 10px;"></div>
            <div style="background: #0f0; width: 20px; height: 10px;"></div>
            <div style="background: #ff0; width: 20px; height: 10px;"></div>
            <div style="background: #00f; width: 20px; height: 10px;"></div>
            <div style="background: #f0f; width: 20px; height: 10px;"></div>
            <div style="background: #0ff; width: 20px; height: 10px;"></div>
            <div style="background: #fff; width: 20px; height: 10px;"></div>
        </div>
    </div>
</div>`;
    printHTML(info);
}

function processCommand(input) {
    const trimmedInput = input.trim();
    const parts = trimmedInput.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (trimmedInput !== '') {
        commandHistory.push(trimmedInput);
        historyIndex = commandHistory.length;
    }

    const currentPathStr = currentPath.length ? '/' + currentPath.join('/') : '~';
    printOutput(`mkeremkurt@lab:${currentPathStr}$ ${input}`, 'command-echo');

    switch (cmd) {
        case 'help':
            printOutput("Available commands:\n  ls              - List directory contents\n  cd [dir]        - Change directory\n  cat [file]      - Display file content\n  open [target]   - Open a link (e.g., open blog)\n  neofetch        - System information\n  date            - Current local time\n  sudo            - Execute command as superuser\n  clear           - Clear terminal\n  whoami          - Who am I?\n  projects --list - List interactive project links", 'command-result');
            break;
        case 'ls':
            const node = getVFSNode(currentPath);
            const items = Object.keys(node).map(item => {
                const subNode = node[item];
                return (typeof subNode === 'object' && subNode.type !== 'link') ? item + '/' : item;
            });
            printOutput(items.join('   '), 'command-result');
            break;
        case 'cd':
            if (!args[0] || args[0] === '~') {
                currentPath = [];
            } else if (args[0] === '..') {
                currentPath.pop();
            } else {
                const target = args[0];
                const currentNode = getVFSNode(currentPath);
                if (currentNode[target] && typeof currentNode[target] === 'object' && currentNode[target].type !== 'link') {
                    currentPath.push(target);
                } else {
                    printOutput(`cd: no such directory: ${target}`, 'error-text');
                }
            }
            updatePrompt();
            break;
        case 'cat':
            if (!args[0]) {
                printOutput("cat: missing file operand", 'error-text');
            } else {
                const target = args[0];
                const currentNode = getVFSNode(currentPath);
                const file = currentNode[target];
                if (file) {
                    if (typeof file === 'string') {
                        printOutput(file, 'command-result');
                    } else if (file.type === 'link') {
                        printOutput(`Redirecting to ${file.url}...`, 'success-text');
                        window.open(file.url, '_blank');
                    } else {
                        printOutput(`cat: ${target}: Is a directory`, 'error-text');
                    }
                } else {
                    printOutput(`cat: ${target}: No such file`, 'error-text');
                }
            }
            break;
        case 'open':
            if (args[0] === 'blog' || args[0] === 'medium') {
                printOutput(`Opening Medium blog...`, 'success-text');
                window.open('https://medium.com/@mkeremkurt', '_blank');
            } else {
                printOutput(`open: usage: open [blog|medium]`, 'error-text');
            }
            break;
        case 'neofetch':
            handleNeofetch();
            break;
        case 'date':
            const time = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
            printOutput(`Current time in Çanakkale: ${time}`, 'command-result');
            break;
        case 'sudo':
            printOutput("Nice try, but you don't have root privileges. This incident will be reported.", 'error-text');
            break;
        case 'clear':
            terminalOutput.innerHTML = '';
            break;
        case 'whoami':
            printOutput(vfs['readme.txt'], 'command-result');
            break;
        case 'projects':
            if (args[0] === '--list') {
                const projNode = vfs['projects'];
                let projHTML = "Interactive Projects:<br>";
                Object.keys(projNode).forEach(key => {
                    projHTML += `- <span class="link-text" onclick="processCommand('cat projects/${key}')">${key}</span>: ${projNode[key]}<br>`;
                });
                printHTML(projHTML, 'command-result');
            } else {
                printOutput("Usage: projects --list", 'error-text');
            }
            break;
        case '':
            break;
        default:
            printOutput(`command not found: ${cmd}. Type 'help' for assistance.`, 'error-text');
    }
}

// Tab Completion
function handleTab() {
    const input = terminalInput.value;
    const parts = input.split(' ');
    const lastPart = parts[parts.length - 1];
    
    const commands = ['help', 'ls', 'cd', 'cat', 'open', 'neofetch', 'date', 'sudo', 'clear', 'whoami', 'projects'];
    const currentNode = getVFSNode(currentPath);
    const files = Object.keys(currentNode);
    
    const candidates = [...commands, ...files].filter(c => c.startsWith(lastPart));
    
    if (candidates.length === 1) {
        parts[parts.length - 1] = candidates[0];
        terminalInput.value = parts.join(' ');
    } else if (candidates.length > 1) {
        printOutput(candidates.join('   '), 'glow-text-subtle');
    }
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        processCommand(input);
        terminalInput.value = '';
        historyIndex = commandHistory.length;
    } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
        e.preventDefault();
    } else if (e.key === 'Tab') {
        handleTab();
        e.preventDefault();
    }
});

// Focus input on click anywhere in terminal
terminalBody.addEventListener('click', () => {
    terminalInput.focus();
});

// Initial greeting
printOutput("Welcome to Mustafa Kerem Kurt's Terminal Lab.", 'success-text');
printOutput("Type 'help' to see available commands.", 'glow-text-subtle');
printOutput("");
