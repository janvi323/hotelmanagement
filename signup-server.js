const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3001;
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
        filePath = './signup.html';
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

    if (req.url === '/signup') {
        await handleSignup(data, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
}

async function handleSignup(data, res) {
    const users = JSON.parse(await fs.readFile(USERS_FILE, 'utf8'));
    if (users.some(u => u.username === data.username)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Username already exists' }));
    } else {
        users.push(data);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User created successfully' }));
    }
}

server.listen(PORT, () => {
    console.log(`Signup server running at http://localhost:${PORT}/`);
});

