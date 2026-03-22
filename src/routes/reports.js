const { execFile } = require('child_process');
const net = require('net');

function isValidHost(host) {
  if (net.isIP(host)) return true;
  const hostnameRegex = /^[a-zA-Z0-9.-]{1,253}$/;
  return hostnameRegex.test(host);
}

const host = req.query.host || '127.0.0.1';

if (!isValidHost(host)) {
  return res.status(400).send('Invalid host');
}

execFile('ping', ['-c', '1', host], { timeout: 5000 }, (err, stdout, stderr) => {
  if (err) return res.status(500).send(stderr || err.message);
  res.type('text').send(stdout);
});
