const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const hapi = require('hapi');
const {promisify} = require('util');

const listener = http2.createSecureServer({
  key: fs.readFileSync(resolve('server.key')),
  cert: fs.readFileSync(resolve('server.crt')),
  passphrase: '1234'
});

const server = hapi.Server({
  listener,
  host: 'localhost',
  port: 8080,
  tls: true
});


async function start() {
  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/{filename*}',
    handler: async (request, h) => {
      const filename = request.params.filename;

      if (/\..*$/.test(filename) && await exists('../dist/' + filename)) {
        return h.file(resolve('../dist/' + filename));
      } else {
        return h.file(resolve('../dist/' + 'index.html'));
      }
    }
  });

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server is running at: ', server.info.uri);
}

start();

async function exists(path) {
   return await promisify(fs.stat)(resolve(path));
}

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}
