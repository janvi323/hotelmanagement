const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Ensure users.json exists
(async () => {
    try {
        await fs.access(USERS_FILE);
    } catch {
        await fs.writeFile(USERS_FILE, '[]');
    }
})();

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    try {
        if (req.method === 'GET') {
            await handleGetRequest(req, res);
        } else if (req.method === 'POST') {
            await handlePostRequest(req, res);
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Method not allowed' }));
        }
    } catch (error) {
        console.error('Server error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
    }
});

async function handleGetRequest(req, res) {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './login.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
    }[extname] || 'application/octet-stream';

    try {
        const content = await fs.readFile(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    } catch (error) {
        if (error.code === 'ENOENT') {
            const content = await fs.readFile('./404.html', 'utf-8');
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        } else {
            throw error;
        }
    }
}

async function handlePostRequest(req, res) {
    let body = '';
    for await (const chunk of req) {
        body += chunk.toString();
    }
    const data = JSON.parse(body);

    if (req.url === '/login') {
        await handleLogin(data, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
}

async function handleLogin(data, res) {
    const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
    const user = users.find(u => u.username === data.username && u.password === data.password);
    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Login successful' }));
    } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid username or password' }));
    }
}

server.listen(PORT, () => {
    console.log(`Login server running at http://localhost:${PORT}/`);
});


