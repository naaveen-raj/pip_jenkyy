 const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/health') return res.end('OK');
  res.end('Hello from Jenkins demo!');
});
server.listen(port, () => console.log('Server running on', port));
